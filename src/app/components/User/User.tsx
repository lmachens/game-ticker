import { useCurrentUser } from '../../hooks/useUser';
import defaultAvatar from './defaultAvatar.svg';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

const User = (): JSX.Element => {
  const [currentUser, profileError] = useCurrentUser();

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <img
          src={currentUser?.avatar || defaultAvatar}
          className={classes.avatar}
          alt="overwolf profile avatar"
        />
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
