import classes from './MatchDetails.module.css';
import type { Match } from '../../../types';
import VideoHighlight from '../VideoHighlight/VideoHighlight';
import useGameInfo from '../../hooks/useGameInfo';

type MatchDetailsProps = {
  match: Omit<Match, '_id'>;
};
function MatchDetails({ match }: MatchDetailsProps): JSX.Element {
  const gameInfo = useGameInfo(match.gameId);

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <p>{gameInfo?.Label}</p>
        <p>{match.username}</p>
      </header>
      {match.highlights.map((highlight) => (
        <article key={highlight.timestamp} className={classes.highlight}>
          <VideoHighlight src={highlight.videoSrc} />
          <p>{highlight.events.join(', ')}</p>
          <p>{highlight.timestamp}</p>
        </article>
      ))}
    </section>
  );
}

export default MatchDetails;
