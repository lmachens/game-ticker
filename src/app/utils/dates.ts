const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_MONTH * 12;

function plural(number: number, one: string, other: string): string {
  return number === 1 ? `${number} ${one}` : `${number} ${other}`;
}

export function toTimeAgo(date: Date): string {
  const time = date.getTime();
  const now = Date.now();

  const difference = Math.abs(time / 1000 - now / 1000);

  let timeAgo = null;
  if (difference / ONE_YEAR >= 1) {
    const time = Math.floor(difference / ONE_YEAR);
    timeAgo = plural(time, 'year', 'years');
  } else if (difference / ONE_MONTH >= 1) {
    const time = Math.floor(difference / ONE_MONTH);
    timeAgo = plural(time, 'month', 'months');
  } else if (difference / ONE_DAY >= 1) {
    const time = Math.floor(difference / ONE_DAY);
    timeAgo = plural(time, 'day', 'days');
  } else if (difference / ONE_HOUR >= 1) {
    const time = Math.floor(difference / ONE_HOUR);
    timeAgo = plural(time, 'hour', 'hours');
  } else if (difference / ONE_MINUTE >= 1) {
    const time = Math.floor(difference / ONE_MINUTE);
    timeAgo = plural(time, 'minute', 'minutes');
  } else {
    const time = Math.floor(difference);
    timeAgo = plural(time, 'second', 'seconds');
  }

  return `${timeAgo} ago`;
}
