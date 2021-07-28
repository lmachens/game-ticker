import { useState } from 'react';
import classes from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import type { MatchClient } from '../types';
import MatchDetails from './components/MatchDetails/MatchDetails';
import User from './components/User/User';

function App(): JSX.Element {
  const [match, setMatch] = useState<MatchClient | null>(null);
  return (
    <div className={classes.container}>
      <AppHeader className={classes.header} />
      <main className={classes.main}>
        {match ? (
          <>
            <button className={classes.back} onClick={() => setMatch(null)}>
              &lt;- Back to feed
            </button>
            <MatchDetails match={match} />
          </>
        ) : (
          <Feed onMatchClick={setMatch} />
        )}
      </main>
      <aside className={classes.aside}>
        <User />
      </aside>
    </div>
  );
}

export default App;
