import defaultAvatar from './defaultAvatar.svg';
import classes from './Profile.module.css';
import { useCurrentUser } from '../../utils/user';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

const User = (): JSX.Element => {
  const [currentUser, profileError] = useCurrentUser();

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            className={classes.avatar}
            alt="overwolf profile avatar"
          />
        ) : (
          defaultAvatar
        )}
        <h1 className={classes.username}>
          {currentUser?.displayName || currentUser?.username || 'Game Ticker'}
        </h1>
      </div>
      {currentUser === null && (
        <aside className={classes.login}>
          For full functionality, please login.{' '}
          <button onClick={openLoginDialog}>Login</button>
        </aside>
      )}
      {profileError && <aside className={classes.error}>{profileError}</aside>}
    </section>
  );
};

export default User;
