import { MatchClient, QueryOptions } from '../../../types';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getHighlights } from '../../utils/api';
import classes from './Feed.module.css';
import FeedFilter from '../FeedFilter/FeedFilter';
import Highlight from '../Highlight/Highlight';

type FeedProps = {
  username: MatchClient['username'] | null;
  onHighlightClick: (matchId: string) => void;
};
function Feed({ username, onHighlightClick }: FeedProps): JSX.Element {
  const [query, setQuery] = useState<QueryOptions>({
    page: 1,
    itemsPerPage: 10,
  });

  const { data: highlights } = useFetch(() => getHighlights(query), {
    invalidateOn: [query],
    refreshInterval: 60000,
  });

  const { page } = query;

  useEffect(() => {
    if (username) {
      setQuery((query) => {
        return { ...query, page: 1, username };
      });
    } else {
      setQuery((query) => {
        const currentQuery = { ...query };
        delete currentQuery.username;
        return { ...currentQuery, page: 1 };
      });
    }
  }, [username]);

  if (!highlights) {
    return <div>Loading...</div>;
  }
  const { info, results } = highlights;
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
        {results.map((highlight) => (
          <Highlight
            key={highlight._id}
            highlight={highlight}
            onHighlightClick={onHighlightClick}
            matchIsActive={true}
            layout="full"
          />
        ))}
      </div>
      {highlights?.results.length === 0 && (
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
