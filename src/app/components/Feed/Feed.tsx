import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getMatches } from '../../utils/api';
import MatchItem from '../MatchItem/MatchItem';
import classes from './Feed.module.css';

type FeedProps = {
  onMatchClick: (matchId: string) => void;
};
function Feed({ onMatchClick }: FeedProps): JSX.Element {
  const [page, setPage] = useState(1);

  const { data: matches } = useFetch(
    () => getMatches({ page, itemsPerPage: 10 }),
    {
      invalidateOn: [page],
      refreshInterval: 60000,
    }
  );

  if (!matches) {
    return <div>Loading...</div>;
  }
  const { info, results } = matches;
  const hasMorePages = info.page * info.itemsPerPage < info.total;

  return (
    <section className={classes.container}>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        Back to top
      </button>
      {results.map((match) => (
        <MatchItem
          key={match._id}
          match={match}
          onClick={() => onMatchClick(match._id)}
        />
      ))}
      {matches?.results.length === 0 && (
        <p className={classes.noMatches}>No matches found</p>
      )}
      <button disabled={!hasMorePages} onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </section>
  );
}

export default Feed;
