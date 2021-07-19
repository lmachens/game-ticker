import classes from './AppHeader.module.css';

function AppHeader(): JSX.Element {
  return (
    <header className={classes.header}>
      <h1 className={classes.title}>Game Ticker</h1>
      <button>_</button>
      <button>x</button>
    </header>
  );
}

export default AppHeader;
