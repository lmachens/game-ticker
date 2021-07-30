import { MatchClient, QueryOptions } from '../../../types';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getHighlights } from '../../utils/api';
import classes from './Feed.module.css';
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

  if (!highlights) {
    return <div>Loading...</div>;
  }
  const { info, results } = highlights;
  const hasMorePages = info.page * info.itemsPerPage < info.total;
  return (
    <section className={classes.container}>
      <button
        disabled={page === 1}
        onClick={() => setQuery({ ...query, page: 1 })}
      >
        Back to top
      </button>
      {results.map((highlight) => (
        <Highlight
          key={highlight._id}
          highlight={highlight}
          onHighlightClick={() => onHighlightClick}
          matchIsActive={true}
          layout="full"
        />
      ))}
      {highlights?.results.length === 0 && (
        <p className={classes.noMatches}>No highlights found</p>
      )}
      <button
        disabled={!hasMorePages}
        onClick={() => setQuery({ ...query, page: page + 1 })}
      >
        Load more
      </button>
    </section>
  );
}

export default Feed;
