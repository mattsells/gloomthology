import { formatISO } from 'date-fns';

export function serialize(model: any) {
  return JSON.parse(JSON.stringify(model, replacer));
}

function replacer(_name: string, value: any): any {
  return value instanceof Date ? formatISO(value) : value;
}
