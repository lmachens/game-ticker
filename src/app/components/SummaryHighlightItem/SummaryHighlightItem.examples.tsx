import { Example } from '../examples';
import SummaryHighlightItem from './SummaryHighlightItem';

export const SummaryHighlightsItem: Example = () => (
  <SummaryHighlightItem events={['kill', 'assist']} timestamp={145} />
);
