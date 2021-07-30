import { MatchClient, QueryOptions } from '../../../types';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getMatches } from '../../utils/api';
import MatchItem from '../MatchItem/MatchItem';
import classes from './Feed.module.css';
import FeedFilter from '../FeedFilter/FeedFilter';

type FeedProps = {
  username: MatchClient['username'] | null;
  onMatchClick: (matchId: string) => void;
};
function Feed({ username, onMatchClick }: FeedProps): JSX.Element {
  const [query, setQuery] = useState<QueryOptions>({
    page: 1,
    itemsPerPage: 10,
  });
  const { page } = query;

  useEffect(() => {
    if (username)
      setQuery((query) => {
        return { ...query, page: 1, username };
      });
    if (!username) {
      setQuery((query) => {
        const currentQuery = { ...query };
        delete currentQuery.username;
        return { ...currentQuery, page: 1 };
      });
    }
  }, [username]);

  const { data: matches } = useFetch(() => getMatches(query), {
    invalidateOn: [query],
    refreshInterval: 60000,
  });

  if (!matches) {
    return <div>Loading...</div>;
  }
  const { info, results } = matches;
  const hasMorePages = info.page * info.itemsPerPage < info.total;
  return (
    <section className={classes.container}>
      <FeedFilter selectedFilter="Newest" onFilterChange={console.log} />
      {page > 1 && (
        <button
          className={classes.button}
          onClick={() => setQuery({ ...query, page: 1 })}
        >
          Most recent
        </button>
      )}
      <div className={classes.items}>
        {results.map((match) => (
          <MatchItem
            key={match._id}
            match={match}
            onClick={() => onMatchClick(match._id)}
          />
        ))}
      </div>
      {matches?.results.length === 0 && (
        <p className={classes.noMatches}>No matches found</p>
      )}
      {hasMorePages && (
        <button
          className={classes.button}
          onClick={() => setQuery({ ...query, page: page + 1 })}
        >
          Next
        </button>
      )}
    </section>
  );
}

export default Feed;
