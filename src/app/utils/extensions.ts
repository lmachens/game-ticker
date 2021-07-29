export function onAppLaunchTriggered(callback: () => void): void {
  overwolf.extensions.onAppLaunchTriggered.addListener(callback);
}
