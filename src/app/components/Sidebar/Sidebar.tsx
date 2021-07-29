import { classNames } from '../../utils/styles';

import Settings from '../Icons/Settings';
import Info from '../Icons/Info';
import Home from '../Icons/Home';
import Favorites from '../Icons/Favorites';
import classes from './Sidebar.module.css';

function Sidebar(): JSX.Element {
  return (
    <nav className={classNames(classes.container, classes.flex)}>
      <section className={classNames(classes.section, classes.flex)}>
        <button className={classes.selected}>
          <Home className={classNames(classes.icon)} />
        </button>
        <button className={classes.disabled} data-tooltip="coming soon">
          <Favorites className={classNames(classes.icon)} />
        </button>
      </section>
      <aside className={classes.flex}>
        <button className={classes.disabled} data-tooltip="coming soon">
          <Info className={classNames(classes.icon)} />
        </button>
        <button className={classes.disabled} data-tooltip="coming soon">
          <Settings className={classNames(classes.icon)} />
        </button>
      </aside>
    </nav>
  );
}

export default Sidebar;
