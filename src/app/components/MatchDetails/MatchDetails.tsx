import classes from './MatchDetails.module.css';
import VideoHighlight from '../VideoHighlight/VideoHighlight';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { getHighlights, getMatch } from '../../utils/api';
import useGameInfo from '../../hooks/useGameInfo';

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
        <p>{gameInfo?.Label}</p>
        <p>{match?.username}</p>
      </header>
      {highlights?.results.map((highlight) => (
        <article key={highlight.timestamp} className={classes.highlight}>
          <VideoHighlight src={highlight.videoSrc} />
          <p>{highlight.events.join(', ')}</p>
          <p>{highlight.timestamp}</p>
        </article>
      ))}
      {errorMessage && <strong>{errorMessage}</strong>}
    </section>
  );
}

export default MatchDetails;
