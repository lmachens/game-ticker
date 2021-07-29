import { useEffect, useState } from 'react';
import { getGameDBInfo } from '../utils/games';

function useGameInfo(
  gameClassId: number | undefined
): overwolf.games.GameInfo | null {
  const [gameInfo, setGameInfo] = useState<overwolf.games.GameInfo | null>(
    null
  );

  useEffect(() => {
    if (!gameClassId) {
      return;
    }
    setGameInfo(null);
    getGameDBInfo(gameClassId).then(setGameInfo).catch(console.error);
  }, [gameClassId]);

  return gameInfo;
}

export default useGameInfo;
