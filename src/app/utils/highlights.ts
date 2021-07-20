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
  overwolf.media.replays.onHighlightsCaptured.addListener((event) => {
    console.log('onHighlightsCaptured', event);
  });

  overwolf.games.onGameLaunched.addListener(async (event) => {
    console.log('onGameLaunched', event);
    await getHighlightsAndTurnOn(event.classId);
  });

  overwolf.games.getRunningGameInfo(async (result) => {
    console.log('check if game is already running', result);
    if (result) {
      await getHighlightsAndTurnOn(result.classId);
    }
  });

  overwolf.games.onGameInfoUpdated.addListener(async (event) => {
    console.log('game info changed', event);
    if (event.runningChanged && !event.gameInfo!.isRunning) {
      await turnOffReplayIfOn();
    }
  });
}

function loadFromLocal(src: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      }
    };

    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.send();
  });
}
type OnProgressProps = {
  loaded: number;
  total: number;
};

type OnProgress = ({ loaded, total }: OnProgressProps) => void;

type UploadToCloudinaryProps = {
  file: Blob;
  onProgress: OnProgress;
};

async function uploadToCloudinary({
  file,
  onProgress,
}: UploadToCloudinaryProps): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'llo9r91u');

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const { secure_url } = xhr.response;
          resolve(secure_url);
        } else {
          reject(xhr.statusText);
        }
      }
    };

    xhr.upload.onprogress = (event) => {
      onProgress({
        loaded: event.loaded,
        total: event.total,
      });
    };

    xhr.open(
      'POST',
      'https://api.cloudinary.com/v1_1/dzegtb57h/video/upload',
      true
    );
    xhr.responseType = 'json';
    xhr.send(formData);
  });
}

type UploadHighlightProps = {
  src: string;
  onProgress: OnProgress;
};
export async function uploadHighlight({
  src,
  onProgress,
}: UploadHighlightProps): Promise<string> {
  const file = await loadFromLocal(src);
  const url = await uploadToCloudinary({ file, onProgress });
  return url;
}
