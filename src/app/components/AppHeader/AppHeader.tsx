import {
  closeMainWindow,
  dragMoveWindow,
  minimizeWindow,
} from '../../utils/overwolf';
import classes from './AppHeader.module.css';

function AppHeader(): JSX.Element {
  return (
    <header className={classes.header}>
      <h1 className={classes.title} onMouseDown={dragMoveWindow}>
        Game Ticker
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
