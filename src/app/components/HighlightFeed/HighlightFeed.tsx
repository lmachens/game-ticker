import { MatchHighlight } from '../../../types';
import Highlight from '../Highlight/Highlight';

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
            <Highlight events={events} timestamp={timestamp} />
          ))
        : 'Nothing to see here (Placeholder)'}
    </section>
  );
}

export default SummaryHighlights;
