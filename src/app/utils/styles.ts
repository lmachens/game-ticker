export function classNames(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter((className) => className).join(' ');
}
