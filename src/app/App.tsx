import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <AppHeader className={styles.header} />
      <main className={styles.main}>MAIN</main>
      <aside className={styles.aside}>ASIDE</aside>
    </div>
  );
}

export default App;
