import FeedFilterElement from '../FeedFilterElement/FeedFilterElement';
import classes from './FeedFilter.module.css';

type FeedFilterProps = {
  selectedFilter?: string;
  onFilterChange: (filterName: string) => void;
};

function FeedFilter({
  selectedFilter,
  onFilterChange,
}: FeedFilterProps): JSX.Element {
  const filters = ['Newest', 'Popular', 'Trending'];
  return (
    <div className={classes.container}>
      {filters.map((filter) => (
        <FeedFilterElement
          active={selectedFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </FeedFilterElement>
      ))}
    </div>
  );
}

export default FeedFilter;
