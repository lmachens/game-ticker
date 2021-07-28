import { MatchHighlight } from '../../../types';
import { Example } from '../examples';
import SummaryHighlight from './SummaryHighlightsFeed';

const highlights: MatchHighlight[] = [
  {
    timestamp: 60,
    events: ['kill', 'assist'],
    videoSrc: '',
  },
  {
    timestamp: 180,
    events: ['kill', 'assist'],
    videoSrc: '',
  },
  {
    timestamp: 360,
    events: ['kill', 'assist'],
    videoSrc: '',
  },
  {
    timestamp: 45,
    events: ['kill', 'assist'],
    videoSrc: '',
  },
];

export const SummaryHighlights: Example = () => (
  <SummaryHighlight highlights={highlights} />
);
