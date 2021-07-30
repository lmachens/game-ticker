import { Example } from '../examples';
import Sidebar from './Sidebar';

export const SidebarDefault: Example = () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      width: '116px',
      backgroundColor: 'darkgrey',
    }}
  >
    <Sidebar />
  </div>
);
