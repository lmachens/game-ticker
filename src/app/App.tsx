import { useState } from 'react';
import classes from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import MatchDetails from './components/MatchDetails/MatchDetails';
import User from './components/User/User';
import Ads from './components/Ads/Ads';

function App(): JSX.Element {
  const [targetMatchId, setTargetMatchId] = useState<string | null>(null);
  return (
    <div>
      <div className={classes.container}>
        <AppHeader className={classes.header} />

        <main className={classes.main}>
          {targetMatchId ? (
            <>
              <button
                className={classes.back}
                onClick={() => setTargetMatchId(null)}
              >
                &lt;- Back to feed
              </button>
              <MatchDetails matchId={targetMatchId} />
            </>
          ) : (
            <Feed onMatchClick={setTargetMatchId} />
          )}
        </main>
        <aside className={classes.aside}>
          <User />
          <Ads />
        </aside>
      </div>
    </div>
  );
}

export default App;
