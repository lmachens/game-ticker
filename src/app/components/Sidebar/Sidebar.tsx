import { classNames } from '../../utils/styles';
import classes from './Sidebar.module.css';
import { SettingsIcon, InfoIcon, HomeIcon, FavoritesIcon } from '../Icons';

function Sidebar(): JSX.Element {
  return (
    <nav className={classNames(classes.container, classes.flex)}>
      <section className={classNames(classes.section, classes.flex)}>
        <a className={classes.selected}>
          <HomeIcon selected />
        </a>
        <a className={classes.disabled} data-tooltip="coming soon">
          <FavoritesIcon disabled />
        </a>
      </section>
      <aside className={classes.flex}>
        <a className={classes.disabled} data-tooltip="coming soon">
          <InfoIcon disabled />
        </a>
        <a className={classes.disabled} data-tooltip="coming soon">
          <SettingsIcon disabled />
        </a>
      </aside>
    </nav>
  );
}

export default Sidebar;
