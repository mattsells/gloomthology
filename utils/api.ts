import { NextApiRequest } from 'next/types';

export function paginate(query: NextApiRequest['query']) {
  const skip = Number(query.skip || 0);
  const take = Number(query.take || 20);

  return { skip, take };
}
