import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { getHighlights } from '../../utils/api';
import SummaryHighlightItem from '../SummaryHighlightItem/SummaryHighlightItem';
import classes from './Feed.module.css';

type FeedProps = {
  onHighlightClick: (matchId: string) => void;
};
function Feed({ onHighlightClick }: FeedProps): JSX.Element {
  const [page, setPage] = useState(1);

  const { data: highlights } = useFetch(
    () => getHighlights({ page, itemsPerPage: 10 }),
    {
      invalidateOn: [page],
      refreshInterval: 60000,
    }
  );

  if (!highlights) {
    return <div>Loading...</div>;
  }
  const { info, results } = highlights;
  const hasMorePages = info.page * info.itemsPerPage < info.total;

  return (
    <section className={classes.container}>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        Back to top
      </button>
      {results.map((highlight) => (
        <SummaryHighlightItem
          key={highlight._id}
          events={highlight.events}
          timestamp={highlight.timestamp}
          onClick={() => onHighlightClick(highlight.matchId)}
        />
      ))}
      {highlights?.results.length === 0 && (
        <p className={classes.noMatches}>No highlights found</p>
      )}
      <button disabled={!hasMorePages} onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </section>
  );
}

export default Feed;
