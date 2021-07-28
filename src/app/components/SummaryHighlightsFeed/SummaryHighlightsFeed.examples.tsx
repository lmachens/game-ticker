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
    timestamp: 780,
    events: ['assist'],
    videoSrc: '',
  },
  {
    timestamp: 5365,
    events: ['kill', 'assist'],
    videoSrc: '',
  },
  {
    timestamp: 45,
    events: ['kill', 'assist', 'healing'],
    videoSrc: '',
  },
  {
    timestamp: 179,
    events: ['assist'],
    videoSrc: '',
  },
];

export const SummaryHighlightsFeed: Example = () => (
  <SummaryHighlight highlights={highlights} />
);
