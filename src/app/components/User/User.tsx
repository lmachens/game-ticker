import { Profile } from '../../../types';
import { useCurrentUser } from '../../hooks/user';
import defaultAvatar from './defaultAvatar.svg';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

type UserProps = {
  onUserClick: (username: Profile['username']) => void;
};

const User = ({ onUserClick }: UserProps): JSX.Element => {
  const [currentUser, profileError] = useCurrentUser();

  return (
    <section
      className={classes.container}
      onClick={() => (currentUser ? onUserClick(currentUser.username) : null)}
    >
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
