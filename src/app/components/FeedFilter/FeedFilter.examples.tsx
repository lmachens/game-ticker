import { Example } from '../examples';
import FeedFilter from './FeedFilter';

export const MyFeedFilter: Example = () => (
  <FeedFilter filters={['Newest', 'Popular', 'Trending']} />
);
