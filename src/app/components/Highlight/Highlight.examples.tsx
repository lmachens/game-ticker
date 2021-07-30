import { Example } from '../examples';
import Highlight from './Highlight';

export const HighlightFullLayout: Example = () => (
  <Highlight
    matchIsActive={true}
    layout="full"
    onHighlightClick={console.log}
    highlight={{
      events: ['kill', 'assist'],
      timestamp: 1627569057364,
      videoSrc: 'overwolf://media/replays/test.mp4',
      matchId: 'asda',
      createdAt: new Date(),
      username: 'halloduda',
      avatar: '',
    }}
  />
);

export const HighlightHalfLayout: Example = () => (
  <Highlight
    matchIsActive={false}
    layout="half"
    onHighlightClick={console.log}
    highlight={{
      events: ['kill', 'assist'],
      timestamp: 1627569057364,
      videoSrc: 'overwolf://media/replays/test.mp4',
      matchId: 'asda',
      createdAt: new Date(),
      username: 'halloduda',
      avatar: '',
    }}
  />
);
