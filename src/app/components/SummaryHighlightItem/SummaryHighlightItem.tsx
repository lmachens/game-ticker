import classes from './SummaryHighlightItem.module.css';

function formatSeconds(seconds: number): string {
  if (seconds < 10) {
    return `0${seconds}`;
  }

  return `${seconds}`;
}

function translateSecondsToTimeString(timestamp: number): string {
  const duration = Number(timestamp);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor((duration % 3600) % 60);

  const minutesDisplay = minutes > 0 ? minutes : '0';
  const secondsDisplay = formatSeconds(seconds);
  return `${minutesDisplay}:${secondsDisplay}`;
}

type summaryHightlightItemProps = {
  events: string[];
  timestamp: number;
};

function SummaryHighlightItem({
  events,
  timestamp,
}: summaryHightlightItemProps): JSX.Element {
  return (
    <article className={classes.container}>
      <p>{events.join(', ')}</p>
      <p>{translateSecondsToTimeString(timestamp)}</p>
    </article>
  );
}

export default SummaryHighlightItem;
