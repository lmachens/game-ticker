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
      <defs>
        <linearGradient
          id="occtyGradient"
          x1="0.94"
          y1="0.74"
          x2="0.06"
          y2="0.26"
        >
          <stop offset="0%" stopColor="#f68e31" />
          <stop offset="10.67%" stopColor="#fb8d28" />
          <stop offset="32%" stopColor="#ff8f38" />
          <stop offset="42.67%" stopColor="#ff824f" />
          <stop offset="64%" stopColor="#fe656f" />
          <stop offset="76%" stopColor="#fa3a7b" />
          <stop offset="100%" stopColor="#bf2a88" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export default IconSvg;
