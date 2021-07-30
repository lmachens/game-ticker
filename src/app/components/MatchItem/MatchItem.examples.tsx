import { Example } from '../examples';
import MatchItem from './MatchItem';

export const MatchItems: Example = () => (
  <>
    <MatchItem
      match={{
        _id: '1',
        username: 'LukasOver9000',
        gameId: 5426,
        createdAt: new Date('2021-07-2021'),
      }}
    />
    <MatchItem
      match={{
        _id: '1',
        username: 'SabineOver9000',
        gameId: 9898,
        createdAt: new Date('2021-05-2021'),
      }}
    />
  </>
);
