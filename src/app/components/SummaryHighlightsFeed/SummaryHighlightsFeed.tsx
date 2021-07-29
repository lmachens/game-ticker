import { MatchHighlight } from '../../../types';
import SummaryHighlightItem from '../SummaryHighlightItem/SummaryHighlightItem';

type SummaryHighlightsProps = {
  highlights: MatchHighlight[];
};

function SummaryHighlights({
  highlights,
}: SummaryHighlightsProps): JSX.Element {
  return (
    <section>
      {highlights.length
        ? highlights.map(({ timestamp, events }) => (
            <SummaryHighlightItem events={events} timestamp={timestamp} />
          ))
        : 'Nothing to see here (Placeholder)'}
    </section>
  );
}

export default SummaryHighlights;
