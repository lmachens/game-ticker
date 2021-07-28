import { Example } from '../examples';
import Feed from './Feed';

export const MatchesFeed: Example = () => (
  <Feed
    matches={{
      info: {
        total: 1,
        itemsPerPage: 5,
        page: 1,
      },
      results: [
        {
          _id: '1',
          username: 'LukasOver9000',
          gameId: 7764,
          createdAt: new Date('2021-07-2021'),
          highlights: [
            {
              timestamp: 10,
              events: ['kill', 'assist'],
              videoSrc: 'https://example.com/video.mp4',
            },
            {
              timestamp: 30,
              events: ['death'],
              videoSrc: 'https://example.com/video.mp4',
            },
          ],
        },
        {
          _id: '2',
          username: 'monaOver9000',
          gameId: 7764,
          createdAt: new Date('2021-07-2021'),
          highlights: [
            {
              timestamp: 10,
              events: ['kill', 'assist'],
              videoSrc: 'https://example.com/video.mp4',
            },
            {
              timestamp: 30,
              events: ['death'],
              videoSrc: 'https://example.com/video.mp4',
            },
          ],
        },
      ],
    }}
    onMatchClick={console.log}
  />
);
