import { useState } from 'react';
import { classNames } from '../../utils/styles';
import classes from './FeedFilterElement.module.css';

type FeedFilterElementProps = {
  children?: React.ReactNode;
};

function FeedFilterElement({ children }: FeedFilterElementProps): JSX.Element {
  const [active, setActive] = useState(false);
  return (
    <button
      className={classNames(classes.button, active && classes.active)}
      onClick={() => {
        setActive(!active);
      }}
    >
      {children}
    </button>
  );
}

export default FeedFilterElement;
