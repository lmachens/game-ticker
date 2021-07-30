import { Profile } from '../../../types';
import useCurrentUser from '../../hooks/useCurrentUser';
import defaultAvatar from './defaultAvatar.svg';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

type UserProps = {
  onUserClick: (username: Profile['username']) => void;
};

const User = ({ onUserClick }: UserProps): JSX.Element => {
  const { currentUser, errorMessage } = useCurrentUser();

  return (
    <section
      className={classes.container}
      onClick={() => (currentUser ? onUserClick(currentUser.username) : null)}
    >
      <div className={classes.header}>
        <img
          src={currentUser?.avatar || defaultAvatar}
          className={classes.avatar}
          alt=""
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
      {errorMessage && <aside className={classes.error}>{errorMessage}</aside>}
    </section>
  );
};

export default User;
