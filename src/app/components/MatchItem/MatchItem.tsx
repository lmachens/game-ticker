import { Match } from '../../../types';
import useGameInfo from '../../hooks/useGameInfo';
import classes from './MatchItem.module.css';

type MatchItemProps = {
  match: Match;
  onClick?: () => void;
};
function MatchItem({ match, onClick }: MatchItemProps): JSX.Element {
  const gameInfo = useGameInfo(match.gameId);

  return (
    <article className={classes.container} onClick={onClick}>
      <p>{match.username}</p>
      <p>{gameInfo?.Label}</p>
      <p>{match.highlights.length}</p>
    </article>
  );
}

export default MatchItem;
