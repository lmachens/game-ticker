import { classNames } from '../../utils/styles';
import classes from './IconSvg.module.css';

export type SVGProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
};

function IconSvg({
  className,
  children,
  disabled,
  selected,
}: SVGProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={classNames(
        className,
        classes.svg,
        selected && classes.selected,
        disabled && classes.disabled
      )}
    >
      {children}
    </svg>
  );
}

export default IconSvg;
