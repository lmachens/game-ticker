import classes from './MatchDetails.module.css';
import VideoHighlight from '../VideoHighlight/VideoHighlight';
import useGameInfo from '../../hooks/useGameInfo';
import useFetch from '../../hooks/useFetch';
import { getMatch } from '../../utils/api';

type MatchDetailsProps = {
  matchId: string;
};
function MatchDetails({ matchId }: MatchDetailsProps): JSX.Element {
  const { data: match, errorMessage } = useFetch(() => getMatch(matchId), {
    refreshInterval: 5000,
    invalidateOn: [matchId],
  });
  const gameInfo = useGameInfo(match?.gameId);

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <p>{gameInfo?.Label}</p>
        <p>{match?.username}</p>
      </header>
      {match?.highlights.map((highlight) => (
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
