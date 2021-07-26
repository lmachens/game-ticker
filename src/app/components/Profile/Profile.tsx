import { useEffect, useState } from 'react';
import defaultAvatar from './defaultAvatar.svg';
import classes from './Profile.module.css';

type Profile = {
  username: string | null;
  displayName: string | null;
  avatar: string | null;
};

const defaultProfile: Profile = {
  username: 'Game-Ticker',
  displayName: 'Game-Ticker',
  avatar: null,
};

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

function getCurrentUser(): Promise<Profile | null> {
  return new Promise((resolve, reject) => {
    try {
      overwolf.profile.getCurrentUser((result) => {
        const { success, displayName, username, avatar } = result;
        if (!success) {
          resolve(null);
          return;
        }

        if (displayName && username && avatar) {
          resolve({
            displayName,
            username,
            avatar,
          });
          return;
        }

        reject();
      });
    } catch (error) {
      reject(error);
    }
  });
}

const Profile = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [loginDialog, setLoginDialog] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    overwolf.profile.onLoginStateChanged.addListener((result) => {
      if (result.connectionState === 'Online') {
        setLogin(true);
      }
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
    return overwolf.profile.onLoginStateChanged.removeListener((result) => {
      if (result.connectionState === 'Online') {
        setLogin(true);
      }
    });
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
