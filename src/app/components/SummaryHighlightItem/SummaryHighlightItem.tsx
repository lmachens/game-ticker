import classes from './SummaryHighlightItem.module.css';

// timestamp in seconds
function createTimeString(timestamp: number): string {
  const duration = Number(timestamp);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor((duration % 3600) % 60);

  const minutesDisplay = minutes > 0 ? minutes : '0';
  const secondsDisplay = seconds > 0 ? seconds : '00';
  return `${minutesDisplay}:${secondsDisplay}`;
}

type summaryHightlightItemProp = {
  events: string[];
  timestamp: number;
};

function SummaryHighlightItem({
  events,
  timestamp,
}: summaryHightlightItemProp): JSX.Element {
  return (
    <article className={classes.container}>
      <p>{events.join(', ')}</p>
      <p>{createTimeString(timestamp)}</p>
    </article>
  );
}

export default SummaryHighlightItem;
