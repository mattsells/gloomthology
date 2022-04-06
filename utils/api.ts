import { NextApiRequest } from 'next/types';
import { unstable_serialize } from 'swr';

import http from '@/lib/http';

import { buildUrl } from './url';

export function paginate(query: NextApiRequest['query']) {
  const skip = Number(query.skip || 0);
  const take = Number(query.take || 20);

  return { skip, take };
}

export function fallbackKey(url: string, data?: any) {
  if (!data) {
    return url;
  }

  return unstable_serialize([url, data]);
}

export function fetcher(key: string) {
  return (args: [string, any]) => {
    const [url, params] = args;

    return http.get(buildUrl(url, params)).then((res) => res.data[key]);
  };
}
