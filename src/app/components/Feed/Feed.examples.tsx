import { Example } from '../examples';
import Feed from './Feed';

export const HighlightsFeed: Example = () => (
  <Feed username={''} onHighlightClick={console.log} />
);
