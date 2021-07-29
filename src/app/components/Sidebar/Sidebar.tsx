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
        <button>
          <Home className={classNames(classes.icon)} />
        </button>
        <button>
          <Favorites className={classNames(classes.icon)} />
        </button>
      </section>
      <aside className={classNames(classes.aside, classes.flex)}>
        <button disabled>
          <Info className={classNames(classes.icon)} />
        </button>
        <button disabled>
          <Settings className={classNames(classes.icon)} />
        </button>
      </aside>
    </nav>
  );
}

export default Sidebar;
