import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import { paginate } from '@/utils/api';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { campaignId } = req.query;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  if (!campaignId) {
    return res
      .status(HttpStatus.UnprocessableEntity)
      .json(failure('No campaign ID provided'));
  }

  const { skip, take } = paginate(req.query);

  const activities = await db.activity.findMany({
    where: {
      campaignId: {
        equals: Number(campaignId),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });

  return res.status(HttpStatus.Success).json(success({ activities }));
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const activity = await db.activity.create({
    data: req.body.activity,
  });

  return res.status(HttpStatus.Success).json(success({ activity }));
}

export default authenticated({ get, post });
