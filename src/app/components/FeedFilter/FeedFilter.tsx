import classes from './FeedFilter.module.css';

type FeedFilterProps = {
  filters: string[];
};

function FeedFilter({ filters }: FeedFilterProps): JSX.Element {
  return (
    <div className={classes.container}>
      {filters.map((filter) => (
        <button className={classes.button}>{filter}</button>
      ))}
    </div>
  );
}

export default FeedFilter;
