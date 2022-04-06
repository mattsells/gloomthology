import qs from 'qs';

import { Routes } from '@/lib/http';

export function recordPath(route: Routes) {
  return (id: string | number) => `${route}/${id}`;
}

export const to = {
  scenario: recordPath(Routes.Scenarios),
};

export function buildUrl(url: string, params = {}): string {
  const query = qs.stringify(params);

  return query ? `${url}?${query}` : url;
}
