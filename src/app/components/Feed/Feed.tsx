import { MatchClient } from '../../../types';
import useMatches from '../../hooks/useMatches';
import MatchItem from '../MatchItem/MatchItem';
import classes from './Feed.module.css';

type FeedProps = {
  onMatchClick: (match: MatchClient) => void;
};
function Feed({ onMatchClick }: FeedProps): JSX.Element {
  const matches = useMatches();

  return (
    <section className={classes.container}>
      {matches?.results.map((match) => (
        <MatchItem
          key={match._id}
          match={match}
          onClick={() => onMatchClick(match)}
        />
      ))}
      {matches?.results.length === 0 && (
        <p className={classes.noMatches}>No matches found</p>
      )}
    </section>
  );
}

export default Feed;
