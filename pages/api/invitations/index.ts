import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import { paginate } from '@/utils/api';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const invitations = await db.invitation.findMany({
    where: {
      toId: {
        equals: user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return res.status(HttpStatus.Success).json(success({ invitations }));
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const invitation = await db.invitation.create({
    data: {
      fromId: user.id,
      toId: req.body.invitation.toId,
    },
  });

  return res.status(HttpStatus.Success).json(success({ invitation }));
}

export default authenticated({ get, post });
