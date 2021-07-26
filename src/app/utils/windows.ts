export const WINDOWS = {
  DESKTOP: 'desktop',
  BACKGROUND: 'background',
  DEVELOPMENT: 'development',
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

export async function closeMainWindow(): Promise<void> {
  const backgroundWindow = await obtainDeclaredWindow(WINDOWS.BACKGROUND);
  overwolf.windows.close(backgroundWindow.id);
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
