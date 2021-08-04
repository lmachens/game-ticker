import { onAppLaunchTriggered } from './utils/extensions';
import { isIngame } from './utils/games';
import { startCaptureHighlights } from './utils/highlights';
import { startOverlayLogic } from './utils/overlay';
import { waitForOverwolf } from './utils/overwolf';
import { restoreWindow, WINDOWS } from './utils/windows';

console.log('Starting background process');
waitForOverwolf().then(async () => {
  startCaptureHighlights();

  if (localStorage.getItem('DEBUG') === 'true') {
    restoreWindow(WINDOWS.DEVELOPMENT);
  }

  restoreWindow(WINDOWS.DESKTOP);
  restoreWindow(WINDOWS.OVERLAY);

  onAppLaunchTriggered(async () => {
    const ingame = await isIngame();
    if (!ingame) {
      restoreWindow(WINDOWS.DESKTOP);
    }
  });

  startOverlayLogic();
});
