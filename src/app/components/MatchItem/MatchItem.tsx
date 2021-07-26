import { Match } from '../../../types';
import classes from './MatchItem.module.css';

type MatchItemProps = {
  match: Match;
};
function MatchItem({ match }: MatchItemProps): JSX.Element {
  return (
    <article className={classes.container}>
      <p>{match.username}</p>
      <p>{match.gameId}</p>
      <p>{match.highlights.length}</p>
    </article>
  );
}

export default MatchItem;
