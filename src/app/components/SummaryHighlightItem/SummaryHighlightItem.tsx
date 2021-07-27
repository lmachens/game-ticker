import classes from './SummaryHighlight.module.css';

type Options = {
  hour: 'numeric';
  minute: 'numeric';
  second: 'numeric';
  hour12: boolean;
  timeZone: string;
};

function createTimestampOutput(timestamp: string): string {
  const date = new Date(Number(timestamp));
  const options: Options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  return new Intl.DateTimeFormat('default', options).format(date);
}

type summaryHightlightItemProp = {
  highlights: string[];
  timestamp: string;
};

function SummaryHighlightItem({
  highlights,
  timestamp,
}: summaryHightlightItemProp): JSX.Element {
  return (
    <article className={classes.container}>
      <p>{highlights.join(', ')}e</p>
      <p>{createTimestampOutput(timestamp)}</p>
    </article>
  );
}

export default SummaryHighlightItem;
