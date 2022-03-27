import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import { paginate, urlSearchParams } from '@/utils/api';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const campaignId = urlSearchParams(req.url).get('campaignId');

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

  const { skip, take } = paginate(req.url);

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

export default authenticated({ get });
