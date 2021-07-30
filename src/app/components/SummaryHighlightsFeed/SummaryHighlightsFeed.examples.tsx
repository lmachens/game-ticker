import useFetch from '../../hooks/useFetch';
import { getHighlights } from '../../utils/api';
import { Example } from '../examples';
import SummaryHighlights from './SummaryHighlightsFeed';

export const SummaryHighlightsFeed: Example = () => {
  const { data } = useFetch(() =>
    getHighlights({
      page: 1,
      itemsPerPage: 10,
    })
  );

  const highlights = data?.results || [];

  return <SummaryHighlights highlights={highlights} />;
};
