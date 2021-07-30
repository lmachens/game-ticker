import { MatchClient } from '../../../types';
import useFetch from '../../hooks/useFetch';
import useGameInfo from '../../hooks/useGameInfo';
import { getHighlights } from '../../utils/api';
import classes from './MatchItem.module.css';

type MatchItemProps = {
  match: MatchClient;
  onClick?: () => void;
};
function MatchItem({ match, onClick }: MatchItemProps): JSX.Element {
  const gameInfo = useGameInfo(match.gameId);
  const { data: highlights } = useFetch(() =>
    getHighlights({ page: 1, itemsPerPage: 10, matchId: match._id })
  );

  return (
    <article className={classes.container} onClick={onClick}>
      <p>{match.username}</p>
      <p>{gameInfo?.Label}</p>
      {highlights && <p>{highlights.results.length}</p>}
    </article>
  );
}

export default MatchItem;
