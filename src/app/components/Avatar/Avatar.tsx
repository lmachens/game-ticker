import { classNames } from '../../utils/styles';
import classes from './Avatar.module.css';

type AvatarProps = {
  src: string;
  size: 'small' | 'large';
  className?: string;
};

function Avatar({ src, size, className }: AvatarProps): JSX.Element {
  return (
    <img
      src={src}
      className={classNames(classes.avatar, classes[size], className)}
      alt=""
    />
  );
}

export default Avatar;
