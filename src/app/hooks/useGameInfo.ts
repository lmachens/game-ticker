import { useEffect, useState } from 'react';
import { getGameDBInfo } from '../utils/games';

function useGameInfo(gameClassId: number): {
  gameInfo: overwolf.games.GameInfo | null;
} {
  const [gameInfo, setGameInfo] = useState<overwolf.games.GameInfo | null>(
    null
  );

  useEffect(() => {
    setGameInfo(null);
    getGameDBInfo(gameClassId).then(setGameInfo).catch(console.error);
  }, [gameClassId]);

  return { gameInfo };
}

export default useGameInfo;
