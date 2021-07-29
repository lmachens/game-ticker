import { Example } from '../examples';
import Feed from './Feed';

export const MatchesFeed: Example = () => <Feed onMatchClick={console.log} />;
