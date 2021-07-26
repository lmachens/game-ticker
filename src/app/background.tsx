import { startCaptureHighlights } from './utils/highlights';
import { waitForOverwolf } from './utils/overwolf';
import { restoreWindow, WINDOWS } from './utils/windows';

console.log('Starting background process');
waitForOverwolf().then(async () => {
  startCaptureHighlights();

  restoreWindow(WINDOWS.DEVELOPMENT);
  restoreWindow(WINDOWS.DESKTOP);

  overwolf.extensions.onAppLaunchTriggered.addListener(() => {
    restoreWindow(WINDOWS.DESKTOP);
  });
});
