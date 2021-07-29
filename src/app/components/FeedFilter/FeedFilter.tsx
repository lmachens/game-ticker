import FeedFilterElement from '../FeedFilterElement/FeedFilterElement';
import classes from './FeedFilter.module.css';

type FeedFilterProps = {
  filters: string[];
};

function FeedFilter({ filters }: FeedFilterProps): JSX.Element {
  return (
    <div className={classes.container}>
      {filters.map((filter) => (
        <FeedFilterElement>{filter}</FeedFilterElement>
      ))}
    </div>
  );
}

export default FeedFilter;
