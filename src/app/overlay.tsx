import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './components/AppHeader/AppHeader';
import './globals.css';
import { waitForOverwolf } from './utils/overwolf';

function Overlay() {
  return (
    <div>
      <AppHeader />
      <div>More content</div>
    </div>
  );
}

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <Overlay />
    </StrictMode>,
    document.querySelector('#root')
  );
});
