// Sometimes `overwolf` is not loaded if debug_url is set. A simple reload of the page will fix this.
export function waitForOverwolf(): Promise<void> {
  return new Promise((resolve) => {
    function isOverwolfLoading() {
      return (
        navigator.userAgent.includes('OverwolfClient') &&
        typeof overwolf === 'undefined'
      );
    }
    if (!isOverwolfLoading()) {
      resolve();
    } else {
      console.log('Overwolf is not ready...');
      setTimeout(() => {
        if (isOverwolfLoading()) {
          console.log('Overwolf is still loading...reloading');
          location.reload();
        } else {
          resolve();
        }
      }, 1000);
    }
  });
}

function getCurrentWindow(): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.getCurrentWindow((currentWindowResult) => {
      if (currentWindowResult.success) {
        resolve(currentWindowResult.window);
      } else {
        reject(currentWindowResult.error);
      }
    });
  });
}

function obtainDeclaredWindow(
  windowName: string
): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (currentWindowResult) => {
      if (currentWindowResult.success) {
        resolve(currentWindowResult.window);
      } else {
        reject(currentWindowResult.error);
      }
    });
  });
}

export async function dragMoveWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.dragMove(currentWindow.id);
}

export async function minimizeWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.minimize(currentWindow.id);
}

export async function closeMainWindow(): Promise<void> {
  const backgroundWindow = await obtainDeclaredWindow('background');
  overwolf.windows.close(backgroundWindow.id);
}
