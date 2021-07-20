import { startCaptureHighlights } from './utils/highlights';
import { waitForOverwolf } from './utils/overwolf';

console.log('Starting background process');
waitForOverwolf().then(() => {
  // overwolf.windows.obtainDeclaredWindow('desktop', (result) => {
  //   overwolf.windows.restore(result.window.id, console.log);
  // });
  startCaptureHighlights();

  // overwolf.windows.obtainDeclaredWindow('development', (result) => {
  //   overwolf.windows.restore(result.window.id, console.log);
  // });
});
