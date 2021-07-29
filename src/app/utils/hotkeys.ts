export function onHotkeyPressed(callback: (name: string) => void): void {
  overwolf.settings.hotkeys.onPressed.addListener((result) => {
    callback(result.name);
  });
}
