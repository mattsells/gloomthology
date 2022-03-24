import { nanoid } from 'nanoid';

export function randomString(length = 10): string {
  return nanoid(length);
}

export function titleize(string: string): string {
  return string.toLowerCase().replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
}
