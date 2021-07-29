import { onAppLaunchTriggered } from './extensions';
import { isIngame, onGameLaunched, onGameTerminated } from './games';
import { onHotkeyPressed } from './hotkeys';
import { closeWindow, restoreWindow, toggleWindow, WINDOWS } from './windows';

export function startOverlayLogic(): void {
  onGameLaunched(() => {
    restoreWindow(WINDOWS.OVERLAY);
  });

  onGameTerminated(() => {
    closeWindow(WINDOWS.OVERLAY);
  });

  onAppLaunchTriggered(async () => {
    const ingame = await isIngame();
    if (ingame) {
      restoreWindow(WINDOWS.OVERLAY);
    }
  });

  onHotkeyPressed((name) => {
    if (name === 'toggle_overlay') {
      toggleWindow(WINDOWS.OVERLAY);
    }
  });
}
