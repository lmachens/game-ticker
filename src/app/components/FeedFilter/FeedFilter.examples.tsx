import { Example } from '../examples';
import FeedFilter from './FeedFilter';

export const MyFeedFilter: Example = () => {
  return <FeedFilter selectedFilter="Newest" onFilterChange={console.log} />;
};
