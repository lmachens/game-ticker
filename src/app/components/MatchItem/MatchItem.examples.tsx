import { Example } from '../examples';
import MatchItem from './MatchItem';

export const MatchItems: Example = () => (
  <>
    <MatchItem
      match={{
        username: 'LukasOver9000',
        gameId: 5426,
        createdAt: new Date('2021-07-2021'),
        highlights: [],
      }}
    />
    <MatchItem
      match={{
        username: 'SabineOver9000',
        gameId: 9898,
        createdAt: new Date('2021-05-2021'),
        highlights: [
          {
            timestamp: 10,
            type: 'kill',
            videoSrc: 'https://example.com/video.mp4',
          },
        ],
      }}
    />
  </>
);
