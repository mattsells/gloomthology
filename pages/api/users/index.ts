import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import { paginate } from '@/utils/api';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { search } = req.query;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const { skip, take } = paginate(req.query);

  const users = await db.user.findMany({
    where: {
      email: {
        contains: search as string,
        mode: 'insensitive',
      },
    },
    orderBy: {
      email: 'asc',
    },
    skip,
    take,
  });

  return res.status(HttpStatus.Success).json(success({ users }));
}

export default authenticated({ get });
