import { Example } from '../examples';
import User from './User';

export const StandardUser: Example = () => (
  <User
    onUserClick={() => {
      console.log('clicked');
    }}
  />
);
