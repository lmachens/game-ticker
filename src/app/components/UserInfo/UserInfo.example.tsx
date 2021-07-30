import { Example } from '../examples';
import UserInfo from './UserInfo';
import defaultAvatarSrc from '../User/defaultAvatar.png';

export const UserInfoLukas: Example = () => (
  <UserInfo
    avatarSrc={defaultAvatarSrc}
    username="LukasOver9000"
    status="League of Legends"
  />
);

export const UserInfoMona: Example = () => (
  <UserInfo
    avatarSrc={defaultAvatarSrc}
    username="MonaOver9000"
    status="CS:GO"
  />
);
