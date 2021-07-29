import { Example } from '../examples';
import Highlight from './Highlight';

export const HighlightItem: Example = () => (
  <Highlight events={['kill', 'assist']} timestamp={145} />
);
