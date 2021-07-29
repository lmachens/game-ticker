export const WINDOWS = {
  DESKTOP: 'desktop',
  BACKGROUND: 'background',
  DEVELOPMENT: 'development',
  OVERLAY: 'overlay',
};

export function getCurrentWindow(): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.success) {
        resolve(result.window);
      } else {
        reject(result.error);
      }
    });
  });
}

export function obtainDeclaredWindow(
  windowName: string
): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
      if (result.success) {
        resolve(result.window);
      } else {
        reject(result.error);
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

export async function closeWindow(windowName: string): Promise<void> {
  const backgroundWindow = await obtainDeclaredWindow(windowName);
  overwolf.windows.close(backgroundWindow.id);
}

export async function closeMainWindow(): Promise<void> {
  return closeWindow(WINDOWS.BACKGROUND);
}

export async function restoreWindow(windowName: string): Promise<string> {
  const declaredWindow = await obtainDeclaredWindow(windowName);
  return new Promise((resolve, reject) =>
    overwolf.windows.restore(declaredWindow.id, (result) => {
      if (result.success) {
        resolve(result.window_id!); // window_id is always a string if success
      } else {
        reject(result.error);
      }
    })
  );
}

export function toggleWindow(windowName: string): void {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (['normal', 'maximized'].includes(result.window.stateEx)) {
      overwolf.windows.hide(result.window.id);
    } else {
      restoreWindow(result.window.id);
    }
  });
}
