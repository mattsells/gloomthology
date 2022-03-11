import { nanoid } from 'nanoid';

export function randomString(length = 10): string {
  return nanoid(length);
}
