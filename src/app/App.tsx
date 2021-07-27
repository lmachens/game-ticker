import { useState } from 'react';
import classes from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import type { Match } from '../types';
import MatchDetails from './components/MatchDetails/MatchDetails';

function App(): JSX.Element {
  const [match, setMatch] = useState<Match | null>(null);
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
      <aside className={classes.aside}>ASIDE</aside>
    </div>
  );
}

export default App;
