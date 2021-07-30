import { Example } from '../examples';
import Highlight from './Highlight';

export const HighlightFullLayout: Example = () => (
  <Highlight
    matchIsActive={true}
    layout="full"
    events={['kill', 'assist']}
    timestamp={1627569057364}
    videoSrc="overwolf://media/replays/test.mp4"
  />
);

export const HighlightHalfLayout: Example = () => (
  <Highlight
    matchIsActive={false}
    layout="half"
    events={['death']}
    timestamp={1627569167364}
    videoSrc="overwolf://media/replays/test.mp4"
  />
);
