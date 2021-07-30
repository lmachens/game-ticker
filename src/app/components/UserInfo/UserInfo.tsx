import Avatar from '../Avatar/Avatar';
import classes from './UserInfo.module.css';

type UserInfoProps = {
  avatarSrc: string;
  username: string;
  status: React.ReactNode;
  onClick?: () => void;
};

const UserInfo = ({
  avatarSrc,
  username,
  status,
  onClick,
}: UserInfoProps): JSX.Element => {
  return (
    <section className={classes.container} onClick={onClick}>
      <Avatar className={classes.avatar} src={avatarSrc} size="large" />
      <h2 className={classes.username}>{username}</h2>
      <p className={classes.status}>{status}</p>
    </section>
  );
};

export default UserInfo;
