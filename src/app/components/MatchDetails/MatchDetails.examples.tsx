import { Example } from '../examples';
import MatchDetails from './MatchDetails';

export const MatchDetailsLukas: Example = () => (
  <MatchDetails
    match={{
      username: 'LukasOver9000',
      gameId: 7764,
      createdAt: new Date('2021-07-2021'),
      highlights: [
        {
          timestamp: 10,
          type: ['kill', 'assist'],
          videoSrc: 'https://example.com/video.mp4',
        },
        {
          timestamp: 30,
          type: ['death'],
          videoSrc: 'https://example.com/video.mp4',
        },
      ],
    }}
  />
);
