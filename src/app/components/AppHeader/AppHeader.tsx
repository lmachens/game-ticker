import { classNames } from '../../utils/styles';
import {
  closeMainWindow,
  dragMoveWindow,
  minimizeWindow,
} from '../../utils/windows';
import classes from './AppHeader.module.css';
import logoSrc from './logo.png';

type AppHeaderProps = {
  className?: string;
};

function AppHeader({ className }: AppHeaderProps): JSX.Element {
  return (
    <header className={classNames(classes.header, className)}>
      <img alt="" src={logoSrc} className={classes.logo} />
      <h1 className={classes.title} onMouseDown={dragMoveWindow}>
        Game <span className={classes.ticker}>Ticker</span>
      </h1>
      <button className={classes.button} onClick={minimizeWindow}>
        <svg viewBox="0 0 10 10" stroke="currentColor">
          <line x1="0" y1="10" x2="10" y2="10" />
        </svg>
      </button>
      <button
        className={`${classes.button} ${classes['button--danger']}`}
        onClick={closeMainWindow}
      >
        <svg viewBox="0 0 10 10" stroke="currentColor">
          <line x1="0" y1="0" x2="10" y2="10" />
          <line x1="10" y1="0" x2="0" y2="10" />
        </svg>
      </button>
    </header>
  );
}

export default AppHeader;
