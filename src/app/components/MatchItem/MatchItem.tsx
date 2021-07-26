import { Match } from '../../../types';
import useGameInfo from '../../hooks/useGameInfo';
import classes from './MatchItem.module.css';

type MatchItemProps = {
  match: Match;
};
function MatchItem({ match }: MatchItemProps): JSX.Element {
  const gameInfo = useGameInfo(match.gameId);

  return (
    <article className={classes.container}>
      <p>{match.username}</p>
      <p>{gameInfo?.Label}</p>
      <p>{match.highlights.length}</p>
    </article>
  );
}

export default MatchItem;
