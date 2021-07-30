import useCurrentUser from '../../hooks/useCurrentUser';
import Avatar from '../Avatar/Avatar';
import defaultAvatar from './defaultAvatar.png';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

const User = (): JSX.Element => {
  const { currentUser } = useCurrentUser();

  return (
    <section className={classes.container}>
      <header className={classes.header}>
        <Avatar
          className={classes.header__avatar}
          src={currentUser?.avatar || defaultAvatar}
          size="large"
        />
        <h2 className={classes.header_username}>
          {currentUser?.displayName || currentUser?.username || 'Game Ticker'}
        </h2>
        <p className={classes.header_status}>
          {!currentUser ? (
            <>
              For full functionality, please{' '}
              <button onClick={openLoginDialog} className={classes.login}>
                Login
              </button>
            </>
          ) : (
            'Start playing a match'
          )}
        </p>
      </header>
      <section className={classes.stats}>
        <strong>12</strong>
        <div className={classes.stats__name}>Matches</div>
        <strong>26</strong>
        <div className={classes.stats__name}>Highlights</div>
        <strong>43</strong>
        <div className={classes.stats__name}>Likes</div>
      </section>
    </section>
  );
};

export default User;
