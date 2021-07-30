import { Example } from '../examples';
import User from './User';

export const StandardUser: Example = () => (
  <div style={{ backgroundColor: 'black' }}>
    <User
      onUserClick={() => {
        console.log('clicked');
      }}
    />
  </div>
);
