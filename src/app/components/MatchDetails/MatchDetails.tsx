import classes from './MatchDetails.module.css';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { getHighlights, getMatch } from '../../utils/api';
import useGameInfo from '../../hooks/useGameInfo';
import Highlight from '../Highlight/Highlight';
import UserInfo from '../UserInfo/UserInfo';

type MatchDetailsProps = {
  matchId: string;
};

type QueryOptions = {
  page: number;
  itemsPerPage: number;
  matchId?: string;
};

function MatchDetails({ matchId }: MatchDetailsProps): JSX.Element {
  const [query, setQuery] = useState<QueryOptions>({
    page: 1,
    itemsPerPage: 10,
  });

  const { data: highlights, errorMessage } = useFetch(
    () => getHighlights(query),
    {
      refreshInterval: 5000,
      invalidateOn: [query],
    }
  );
  const { data: match } = useFetch(() => getMatch(matchId));

  useEffect(() => {
    if (matchId)
      setQuery((query) => {
        return { ...query, page: 1, matchId };
      });
    if (!matchId) {
      setQuery((query) => {
        const currentQuery = { ...query };
        delete currentQuery.matchId;
        return { ...currentQuery, page: 1 };
      });
    }
  }, [matchId]);

  const gameInfo = useGameInfo(match?.gameId);

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <UserInfo
          username={match?.username || ''}
          status={gameInfo?.Label}
          avatarSrc="https://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/588.png"
        />
      </header>
      {highlights?.results.map((highlight) => (
        <Highlight
          key={highlight._id}
          layout="full"
          highlight={highlight}
          onHighlightClick={console.log}
          matchIsActive={true}
        />
      ))}
      {errorMessage && <strong>{errorMessage}</strong>}
    </section>
  );
}

export default MatchDetails;
