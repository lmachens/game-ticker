export function classNames(...classes: (string | undefined)[]): string {
  return classes.filter((className) => className).join(' ');
}
