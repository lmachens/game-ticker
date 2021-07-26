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
