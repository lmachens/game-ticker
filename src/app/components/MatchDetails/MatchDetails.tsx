import classes from './MatchDetails.module.css';
import type { Match } from '../../../types';
import VideoHighlight from '../VideoHighlight/VideoHighlight';

type MatchDetailsProps = {
  match: Match;
};
function MatchDetails({ match }: MatchDetailsProps): JSX.Element {
  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <p>{match.gameId}</p>
        <p>{match.username}</p>
      </header>
      {match.highlights.map((highlight) => (
        <article key={highlight.timestamp} className={classes.highlight}>
          <VideoHighlight src={highlight.videoSrc} />
          <p>{highlight.type}</p>
          <p>{highlight.timestamp}</p>
        </article>
      ))}
    </section>
  );
}

export default MatchDetails;
