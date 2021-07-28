import { useState } from 'react';
import classes from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import type { MatchClient, Profile } from '../types';
import MatchDetails from './components/MatchDetails/MatchDetails';
import User from './components/User/User';
import useMatches from './hooks/useMatches';

function App(): JSX.Element {
  const [match, setMatch] = useState<MatchClient | null>(null);
  const [username, setUsername] = useState<Profile['username']>(null);
  const matches = useMatches(username);

  function handleButtonClick() {
    setMatch(null);
    setUsername(null);
  }

  return (
    <div className={classes.container}>
      <AppHeader className={classes.header} />
      <main className={classes.main}>
        <header className={classes.options}>
          {(match || username) && (
            <button
              className={classes.back}
              onClick={() => handleButtonClick()}
            >
              &lt;- Back to feed
            </button>
          )}
          {username && <span>{username}</span>}
        </header>
        {match ? (
          <MatchDetails match={match} />
        ) : (
          <Feed matches={matches} onMatchClick={setMatch} />
        )}
      </main>
      <aside className={classes.aside}>
        <User onUserClick={setUsername} />
      </aside>
    </div>
  );
}

export default App;
