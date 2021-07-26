import { Match, MatchHighlight } from '../../types';

const { VITE_PORT } = import.meta.env;
const baseUrl = `http://localhost:${VITE_PORT}/api`;

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

async function postNewMatch(gameId: number): Promise<ActiveMatch> {
  const username = 'peter123';
  const data = JSON.stringify({ gameId: gameId, username: username });

  try {
    const response = await fetch(`${baseUrl}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    const result = await response.json();

    console.log('postNewMatch', result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function postNewHighlight({
  videoSrc,
  type,
  timestamp,
}: MatchHighlight): Promise<ActiveMatch> {
  if (!activeMatch) return null;
  const data = JSON.stringify({ videoSrc, type, timestamp });

  try {
    const response = await fetch(
      `${baseUrl}/matches/${activeMatch._id}/highlights`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }
    );
    const result = await response.json();

    console.log('postNewHighlight', result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
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
    const { media_url, events, match_start_time, replay_video_start_time } =
      event;
    const timestamp = replay_video_start_time - Number(match_start_time);

    const cloudinaryURL = await uploadHighlight({ src: media_url });
    const updatedMatch = await postNewHighlight({
      videoSrc: cloudinaryURL,
      type: events[0],
      timestamp: timestamp,
    });
    activeMatch = updatedMatch;
    console.log('updatedMatch', updatedMatch);
  });

  overwolf.games.onGameLaunched.addListener(async (event) => {
    console.log('onGameLaunched', event);
    await getHighlightsAndTurnOn(event.classId);
    activeMatch = await postNewMatch(event.classId);

    console.log('activeMatch', activeMatch);
  });

  overwolf.games.getRunningGameInfo(async (result) => {
    console.log('check if game is already running', result);
    if (result) {
      await getHighlightsAndTurnOn(result.classId);

      if (!activeMatch) {
        activeMatch = await postNewMatch(result.classId);
      }
    }
  });

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
