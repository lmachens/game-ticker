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
  overwolf.games.onGameLaunched.addListener(async (event) => {
    callback(event.classId);
  });

  overwolf.games.getRunningGameInfo(async (event) => {
    if (event.success) {
      callback(event.classId);
    }
  });
}
