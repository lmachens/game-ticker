import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './components/AppHeader/AppHeader';
import './globals.css';
import { waitForOverwolf } from './utils/overwolf';
import Highlight from './components/Highlight/Highlight';
import Ads from './components/Ads/Ads';
import classes from './overlay.module.css';

function Overlay() {
  return (
    <div className={classes.container}>
      <AppHeader />
      <main>
        <Highlight
          matchIsActive={false}
          layout="half"
          onHighlightClick={console.log}
          highlight={{
            events: ['kill', 'assist'],
            timestamp: 1627569057364,
            videoSrc: 'overwolf://media/replays/test.mp4',
            matchId: 'asda',
            createdAt: new Date(),
            username: 'halloduda',
            avatar: '',
          }}
        />
      </main>
      <aside>
        <Ads />
      </aside>
    </div>
  );
}

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <Overlay />
    </StrictMode>,
    document.querySelector('#root')
  );
});
