import { MatchHighlightClient } from '../../../types';
import SummaryHighlightItem from '../SummaryHighlightItem/SummaryHighlightItem';

type SummaryHighlightsProps = {
  highlights: MatchHighlightClient[];
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
