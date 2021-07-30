import classes from './FeedFilterElement.module.css';

type FeedFilterElementProps = {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

function FeedFilterElement({
  children,
  active,
  onClick,
}: FeedFilterElementProps): JSX.Element {
  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={onClick}>
        {children}
      </button>
      {active && <div className={classes.active}></div>}
    </div>
  );
}

export default FeedFilterElement;
