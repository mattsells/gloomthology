import { format, formatISO, parseISO } from 'date-fns';

export enum DateFormat {
  Short = 'LLL d, y',
}

export function formatDate(
  date: Date | string,
  dateFormat = DateFormat.Short
): string {
  const stringDate = typeof date === 'string' ? parseISO(date) : date;

  return format(stringDate, dateFormat);
}

export function currentTime(): string {
  return formatISO(new Date());
}
