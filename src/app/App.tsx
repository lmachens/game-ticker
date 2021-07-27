import { useState } from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import Feed from './components/Feed/Feed';
import type { Match } from '../types';

function App(): JSX.Element {
  const [match, setMatch] = useState<Match | null>(null);
  return (
    <div className={styles.container}>
      <AppHeader className={styles.header} />
      <main className={styles.main}>
        <Feed onMatchClick={setMatch} />
      </main>
      <aside className={styles.aside}>ASIDE</aside>
    </div>
  );
}

export default App;
