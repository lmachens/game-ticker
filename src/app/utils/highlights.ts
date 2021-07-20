// Todo:
// 1) Promisfy to reduce nesting (callback hell)
// 2) turnOf capturing on game end
// 3) Record highlights if app is started after a game

// League of Legends Config
const GAME_ID = 5426;

export async function getHighlights(
  id: number
): Promise<string[] | undefined | null> {
  return new Promise((resolve, reject) => {
    overwolf.media.replays.getHighlightsFeatures(id, (event) => {
      console.log('getHighlightsFeatures', event);
      if (event.success) {
        resolve(event.features);
      }
      reject(null);
    });
  });
}

export async function turnOnReplay(
  highlights: string[] | null | undefined
): Promise<overwolf.media.replays.TurnOnResult | null> {
  const requiredHighlights =
    highlights && highlights.length ? highlights : ['*'];

  return new Promise((resolve, reject) => {
    if (highlights) {
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
          if (event.success) {
            console.log('turned on', event);
            resolve(event);
          } else {
            console.log('replay failed', event);
            reject(null);
          }
        }
      );
    }
  });
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

  overwolf.games.getRunningGameInfo(async (result) => {
    console.log('check if game is already running');
    if (!result) {
      overwolf.games.onGameLaunched.addListener(async (event) => {
        console.log('onGameLaunched', event);

        if (event.classId === GAME_ID) {
          const highlights = await getHighlights(GAME_ID);
          await turnOnReplay(highlights);
        }
      });
    }

    const classId =
      !Array.isArray(result) && result?.classId ? result.classId : null;

    if (classId === GAME_ID) {
      console.log('game already running');
      const highlights = await getHighlights(GAME_ID);
      await turnOnReplay(highlights);
    }
  });

  overwolf.games.onGameInfoUpdated.addListener((event) => {
    console.log('game info changed', event.gameInfo);
    if (!event.gameInfo?.isRunning) {
      overwolf.media.replays.turnOff((event) => {
        if (event.success) {
          console.log('replay turned off', event);
        } else {
          console.log('replay turnOff error', event.error);
        }
      });
    }
  });
}
