import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './components/AppHeader/AppHeader';
import UserInfo from './components/UserInfo/UserInfo';
import './globals.css';
import useCurrentUser from './hooks/useCurrentUser';
import { waitForOverwolf } from './utils/overwolf';
import defaultAvatarSrc from '../../src/app/components/User/defaultAvatar.png';
import useGameInfo from './hooks/useGameInfo';
import Highlight from './components/Highlight/Highlight';
import Ads from './components/Ads/Ads';
import classes from './overlay.module.css';

function Overlay() {
  const { currentUser } = useCurrentUser();
  const gameinfo = useGameInfo(5426);
  return (
    <div className={classes.container}>
      <AppHeader />
      <UserInfo
        avatarSrc={currentUser?.avatar || defaultAvatarSrc}
        username={currentUser?.username || ''}
        status={gameinfo?.GameTitle}
      />
      <Highlight
        matchIsActive={false}
        layout="half"
        events={['death']}
        timestamp={1627569167364}
        videoSrc="overwolf://media/replays/test.mp4"
      />
      <Ads />
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
