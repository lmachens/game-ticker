import { useState } from 'react';
import classes from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import type { Profile } from '../types';
import MatchDetails from './components/MatchDetails/MatchDetails';
import User from './components/User/User';
import Ads from './components/Ads/Ads';

function App(): JSX.Element {
  const [targetMatchId, setTargetMatchId] = useState<string | null>(null);
  const [username, setUsername] = useState<Profile['username']>(null);

  function handleBackToFeedClick() {
    setTargetMatchId(null);
    setUsername(null);
  }

  return (
    <div className={classes.container}>
      <AppHeader className={classes.header} />
      <main className={classes.main}>
        <header className={classes.options}>
          {(targetMatchId || username) && (
            <button className={classes.back} onClick={handleBackToFeedClick}>
              &lt;- Back to feed
            </button>
          )}
          {username && !targetMatchId && <span>{username}</span>}
        </header>
        {targetMatchId ? (
          <MatchDetails matchId={targetMatchId} />
        ) : (
          <Feed username={username} onMatchClick={setTargetMatchId} />
        )}
      </main>
      <aside className={classes.aside}>
        <User onUserClick={setUsername} />
        <Ads />
      </aside>
    </div>
  );
}

export default App;
