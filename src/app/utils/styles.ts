export function classNames(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter((className) => className).join(' ');
}
