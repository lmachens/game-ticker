// Todo:
// 1) Promisfy to reduce nesting (callback hell)
// 2) turnOf capturing on game end

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

  overwolf.games.onGameLaunched.addListener((event) => {
    console.log('onGameLaunched', event);

    overwolf.media.replays.getHighlightsFeatures(event.classId, (event) => {
      console.log('getHighlightsFeatures', event);
      if (event.success) {
        overwolf.media.replays.turnOn(
          {
            settings: {
              video: {
                buffer_length: 30000,
              },
            },
            highlights: {
              enable: true,
              requiredHighlights: ['*'],
            },
          },
          (event) => {
            console.log('turnOn', event);
          }
        );
      }
    });
  });
}
