import { classNames } from '../../utils/styles';
import classes from './Sidebar.module.css';
import { Settings, Info, Home, Favorites } from '../Icons';

function Sidebar(): JSX.Element {
  return (
    <nav className={classNames(classes.container, classes.flex)}>
      <section className={classNames(classes.section, classes.flex)}>
        <a className={classes.selected}>
          <Home selected={true} />
        </a>
        <a className={classes.disabled} data-tooltip="coming soon">
          <Favorites disabled={true} />
        </a>
      </section>
      <aside className={classes.flex}>
        <a className={classes.disabled} data-tooltip="coming soon">
          <Info disabled={true} />
        </a>
        <a className={classes.disabled} data-tooltip="coming soon">
          <Settings disabled={true} />
        </a>
      </aside>
    </nav>
  );
}

export default Sidebar;
