export function getGameDBInfo(
  gameClassId: number
): Promise<overwolf.games.GameInfo> {
  return new Promise((resolve, reject) => {
    overwolf.games.getGameDBInfo(gameClassId, (result) => {
      if (result.success) {
        resolve(result.installedGameInfo?.GameInfo || result.gameInfo!);
      } else {
        reject(result.error);
      }
    });
  });
}

export function onGameLaunched(callback: (classId: number) => void): void {
  overwolf.games.onGameLaunched.addListener(async (result) => {
    callback(result.classId);
  });

  overwolf.games.getRunningGameInfo(async (result) => {
    if (result?.success) {
      callback(result.classId);
    }
  });
}

export function isIngame(): Promise<boolean> {
  return new Promise((resolve) => {
    overwolf.games.getRunningGameInfo((result) => {
      resolve(Boolean(result?.success));
    });
  });
}

export function onGameTerminated(callback: (classId: number) => void): void {
  overwolf.games.onGameInfoUpdated.addListener(async (event) => {
    if (event.gameInfo && event.runningChanged && !event.gameInfo.isRunning) {
      callback(event.gameInfo.classId);
    }
  });
}
