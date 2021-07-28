import { MatchClient, PaginatedMatchesClient } from '../../../types';
import MatchItem from '../MatchItem/MatchItem';
import classes from './Feed.module.css';

type FeedProps = {
  matches: PaginatedMatchesClient | null;
  onMatchClick: (match: MatchClient) => void;
};
function Feed({ matches, onMatchClick }: FeedProps): JSX.Element {
  return (
    <section className={classes.container}>
      {matches?.results.map((match) => (
        <MatchItem
          key={match._id!.toString()}
          match={match}
          onClick={() => onMatchClick(match)}
        />
      ))}
    </section>
  );
}

export default Feed;
