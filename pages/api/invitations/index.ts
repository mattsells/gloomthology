import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { toApiResponse } from '@/lib/api/error';
import { authenticate } from '@/lib/auth';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import * as InvitationsService from '@/services/invitations';
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
  try {
    const user = authenticate(req);
    const { email } = req.body.invitation;

    const invitation = await InvitationsService.create({ email, user });

    return res.status(HttpStatus.Success).json(success({ invitation }));
  } catch (err) {
    const { data, status } = toApiResponse(err);

    return res.status(status).json(data);
  }
}

export default authenticated({ get, post });
