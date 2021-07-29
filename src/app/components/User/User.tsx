import useCurrentUser from '../../hooks/useCurrentUser';
import Avatar from '../Avatar/Avatar';
import defaultAvatar from './defaultAvatar.svg';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

const User = (): JSX.Element => {
  const { currentUser, errorMessage } = useCurrentUser();

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <Avatar src={currentUser?.avatar || defaultAvatar} size="large" />
        <h1 className={classes.username}>
          {currentUser?.displayName || currentUser?.username || 'Game Ticker'}
        </h1>
      </header>
      {currentUser === null && (
        <aside className={classes.login}>
          For full functionality, please login.{' '}
          <button onClick={openLoginDialog}>Login</button>
        </aside>
      )}
      {errorMessage && <aside className={classes.error}>{errorMessage}</aside>}
    </section>
  );
};

export default User;
