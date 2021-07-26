import { useEffect, useState } from 'react';
import defaultAvatar from './defaultAvatar.svg';
import classes from './Profile.module.css';
import { Profile, getCurrentUser } from '../../utils/user';

const defaultProfile: Profile = {
  username: 'Game-Ticker',
  displayName: 'Game-Ticker',
  avatar: null,
};

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

const Profile = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [loginDialog, setLoginDialog] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    overwolf.profile.onLoginStateChanged.addListener((result) => {
      if (result.connectionState !== 'Online') {
        setLogin(false);
        return;
      }
      setLogin(true);
    });
    const getUser = async () => {
      try {
        const result = await getCurrentUser();

        if (!result) {
          setLoginDialog(true);
          return;
        }

        setLoginDialog(false);
        setProfile({
          displayName: result.displayName || null,
          username: result.username || null,
          avatar: result.avatar || null,
        });
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setProfileError(error.message);
        }
      }
    };
    getUser();
  }, [login]);

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        {profile.avatar ? (
          <img
            src={profile.avatar}
            className={classes.avatar}
            alt="overwolf profile avatar"
          />
        ) : (
          defaultAvatar
        )}
        <h1 className={classes.username}>
          {profile.displayName || profile.username}
        </h1>
      </div>
      {loginDialog && (
        <aside className={classes.login}>
          For full functionality, please login.{' '}
          <button onClick={openLoginDialog}>Login</button>
        </aside>
      )}
      {profileError && <aside className={classes.error}>{profileError}</aside>}
    </section>
  );
};

export default Profile;
