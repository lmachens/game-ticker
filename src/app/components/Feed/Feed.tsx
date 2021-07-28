import useFetch from '../../hooks/useFetch';
import { getMatches } from '../../utils/api';
import MatchItem from '../MatchItem/MatchItem';
import classes from './Feed.module.css';

type FeedProps = {
  onMatchClick: (matchId: string) => void;
};
function Feed({ onMatchClick }: FeedProps): JSX.Element {
  const { data: matches, refresh } = useFetch(getMatches);

  return (
    <section className={classes.container}>
      <button onClick={refresh}>Refresh</button>
      {matches?.results.map((match) => (
        <MatchItem
          key={match._id}
          match={match}
          onClick={() => onMatchClick(match._id)}
        />
      ))}
    </section>
  );
}

export default Feed;
