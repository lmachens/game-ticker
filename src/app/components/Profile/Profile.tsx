import { useEffect, useState } from 'react';
import defaultAvatar from './defaultAvatar.svg';
import classes from './Profile.module.css';

type Profile = {
  username: string | null;
  displayName: string | null;
  avatar: string | null;
};

function Profile(): JSX.Element {
  const defaultProfile: Profile = {
    username: 'Game-Ticker',
    displayName: 'Game-Ticker',
    avatar: null,
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [loginDialog, setLoginDialog] = useState(false);

  useEffect(() => {
    try {
      overwolf.profile.getCurrentUser((result) => {
        const { success, displayName, username, avatar } = result;

        if (!success) {
          setLoginDialog(true);
          return;
        }
        setLoginDialog(true);
        setProfile({
          displayName: displayName || null,
          username: username || null,
          avatar: avatar || null,
        });
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setProfileError(error.message);
      }
    }
  });

  return (
    <section className={classes.profile}>
      {profile.avatar ? (
        <img src={profile.avatar} alt="overwolf profile avatar" />
      ) : (
        defaultAvatar
      )}
      <h1>{profile.displayName || profile.username}</h1>
      {loginDialog && (
        <aside>
          For full functionality, please login. <button>Login</button>
        </aside>
      )}
      {profileError && <aside>{profileError}</aside>}
    </section>
  );
}

export default Profile;
