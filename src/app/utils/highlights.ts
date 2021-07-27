import { Match } from '../../types';
import { postMatch, postMatchHighlight } from './api';

type ActiveMatch = Match | null;

let activeMatch: ActiveMatch = null;

export function getHighlightsFeatures(id: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    overwolf.media.replays.getHighlightsFeatures(id, (event) => {
      console.log('getHighlightsFeatures', event);
      if (event.success) {
        resolve(event.features!);
      } else {
        reject(event.error);
      }
    });
  });
}

export function turnOnReplay(
  requiredHighlights: string[]
): Promise<overwolf.media.replays.TurnOnResult> {
  return new Promise((resolve, reject) => {
    overwolf.media.replays.turnOn(
      {
        settings: {
          video: {
            buffer_length: 30000,
          },
        },
        highlights: {
          enable: true,
          requiredHighlights,
        },
      },
      (event) => {
        console.log('turnOn', event);
        if (event.success) {
          resolve(event);
        } else {
          reject(event.error);
        }
      }
    );
  });
}

export function turnOffReplayIfOn(): Promise<void> {
  return new Promise((resolve, reject) => {
    overwolf.media.replays.getState((state) => {
      if (!state.success) {
        reject(state.error);
        return;
      }
      if (!state.isOn) {
        resolve();
        return;
      }
      overwolf.media.replays.turnOff((event) => {
        console.log('turnOff', event);
        if (event.success) {
          resolve();
        } else {
          reject(event.error);
        }
      });
    });
  });
}

async function getHighlightsAndTurnOn(classId: number) {
  const highlights = await getHighlightsFeatures(classId);
  if (highlights.length) {
    await turnOnReplay(highlights);
  }
}

export function startCaptureHighlights(): void {
  console.log('startCaptureHighlights');
  overwolf.media.replays.onCaptureError.addListener((event) => {
    console.error('onCaptureError', event);
  });
  overwolf.media.replays.onCaptureStopped.addListener((event) => {
    console.info('onCaptureStopped', event);
  });
  overwolf.media.replays.onCaptureWarning.addListener((event) => {
    console.warn('onCaptureWarning', event);
  });
  overwolf.media.replays.onReplayServicesStarted.addListener((event) => {
    console.log('onReplayServicesStarted', event);
  });
  overwolf.media.replays.onHighlightsCaptured.addListener(async (event) => {
    console.log('onHighlightsCaptured', event);
    const {
      media_url: mediaUrl,
      events,
      match_start_time: matchStartTime,
      replay_video_start_time: replayVideoStartTime,
    } = event;
    const timestamp = replayVideoStartTime - Number(matchStartTime);

    const cloudinaryURL = await uploadHighlight({ src: mediaUrl });

    if (!activeMatch) {
      const newMatch = await postMatch(event.game_id);
      activeMatch = newMatch;

      if (!activeMatch) return;
    }

    const highlight = {
      videoSrc: cloudinaryURL,
      events: events,
      timestamp: timestamp,
    };
    const updatedMatch = await postMatchHighlight(highlight, activeMatch._id);

    activeMatch = updatedMatch;
    console.log('updatedMatch', updatedMatch);
  });

  onGameLaunched(async (classId) => {
    console.log('onGameLaunched', classId);
    await getHighlightsAndTurnOn(classId);
    activeMatch = await postMatch(classId);

    console.log('activeMatch', activeMatch);
  });

  function onGameLaunched(callback: (classId: number) => void): void {
    overwolf.games.onGameLaunched.addListener(async (event) => {
      callback(event.classId);
    });

    overwolf.games.getRunningGameInfo(async (event) => {
      if (event.success) {
        callback(event.classId);
      }
    });
  }

  overwolf.games.onGameInfoUpdated.addListener(async (event) => {
    console.log('game info changed', event);
    if (event.runningChanged && !event.gameInfo!.isRunning) {
      await turnOffReplayIfOn();
    }
  });
}

async function loadFromLocal(src: string): Promise<Blob> {
  const response = await fetch(src);
  const blob = await response.blob();
  return blob;
}

type OnProgressProps = {
  loaded: number;
  total: number;
};

type OnProgress = ({ loaded, total }: OnProgressProps) => void;

type UploadToCloudinaryProps = {
  file: Blob;
  onProgress?: OnProgress;
};

const { VITE_CLOUDINARY_PRESET, VITE_CLOUDINARY_CLOUD_NAME } = import.meta.env;

if (
  typeof VITE_CLOUDINARY_PRESET !== 'string' ||
  typeof VITE_CLOUDINARY_CLOUD_NAME !== 'string'
) {
  throw new Error('Missing environment variable');
}

const uploadToCloudinary = async ({
  file,
  onProgress,
}: UploadToCloudinaryProps): Promise<string> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', VITE_CLOUDINARY_PRESET);

    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const { secure_url } = xhr.response;
        resolve(secure_url);
      } else {
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => {
      reject(xhr.statusText);
    };

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        onProgress({
          loaded: event.loaded,
          total: event.total,
        });
      };
    }

    xhr.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
      true
    );
    xhr.responseType = 'json';
    xhr.send(formData);
  });
};

type UploadHighlightProps = {
  src: string;
  onProgress?: OnProgress;
};
export async function uploadHighlight({
  src,
  onProgress,
}: UploadHighlightProps): Promise<string> {
  const file = await loadFromLocal(src);
  const url = await uploadToCloudinary({ file, onProgress });
  return url;
}
