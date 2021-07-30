import { Profile } from '../../../types';
import useCurrentUser from '../../hooks/useCurrentUser';
import UserInfo from '../UserInfo/UserInfo';
import defaultAvatar from './defaultAvatar.png';
import classes from './User.module.css';

function openLoginDialog() {
  overwolf.profile.openLoginDialog();
}

type UserProps = {
  onUserClick: (user: Profile['username']) => void;
};

const User = ({ onUserClick }: UserProps): JSX.Element => {
  const { currentUser } = useCurrentUser();

  return (
    <section
      className={classes.container}
      onClick={
        currentUser ? () => onUserClick(currentUser.username) : undefined
      }
    >
      <UserInfo
        onClick={
          currentUser ? () => onUserClick(currentUser.username) : undefined
        }
        avatarSrc={currentUser?.avatar || defaultAvatar}
        username={
          currentUser?.displayName || currentUser?.username || 'Game Ticker'
        }
        status={
          !currentUser ? (
            <>
              For full functionality, please{' '}
              <button onClick={openLoginDialog} className={classes.login}>
                Login
              </button>
            </>
          ) : (
            'Start playing a match'
          )
        }
      />
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
