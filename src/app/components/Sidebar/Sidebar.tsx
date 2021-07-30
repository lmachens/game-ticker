import { classNames } from '../../utils/styles';
import classes from './Sidebar.module.css';
import { SettingsIcon, InfoIcon, HomeIcon, FavoritesIcon } from '../Icons';
import Gradient from '../IconSvg/Gradient';

function Sidebar(): JSX.Element {
  return (
    <nav className={classNames(classes.container, classes.flex)}>
      <section className={classNames(classes.section, classes.flex)}>
        <a className={classNames(classes.selected, classes.link)}>
          <HomeIcon selected />
        </a>
        <a
          className={classNames(classes.disabled, classes.link)}
          data-tooltip="coming soon"
        >
          <FavoritesIcon disabled />
        </a>
        <Gradient />
      </section>
      <aside className={classes.flex}>
        <a
          className={classNames(classes.disabled, classes.link)}
          data-tooltip="coming soon"
        >
          <InfoIcon disabled />
        </a>
        <a
          className={classNames(classes.disabled, classes.link)}
          data-tooltip="coming soon"
        >
          <SettingsIcon disabled />
        </a>
      </aside>
    </nav>
  );
}

export default Sidebar;
