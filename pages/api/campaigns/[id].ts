import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { HttpStatus } from '@/lib/http';
import { error, failure, success } from '@/lib/http/response';
import { authenticated } from '@/lib/session/api';
import CampaignSchema from '@/schemas/campaign';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { id } = req.query;

  // Need to check if user is logged in
  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const campaign = await db.campaign.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      activities: true,
      location: true,
      users: true,
    },
  });

  if (!campaign) {
    return res.status(HttpStatus.NotFound).json(failure('Campaign not found'));
  }

  const campaignUser = campaign.users.find(
    (campaignUser) => campaignUser.userId === user.id
  );

  if (!campaignUser) {
    return res.status(HttpStatus.Unauthorized).json(failure('Not authorized'));
  }

  return res.status(HttpStatus.Success).json(
    success({
      campaign,
    })
  );
}

async function patch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { campaign } = req.body;

    await CampaignSchema.validate(campaign);

    // TODO: Validate

    const updatedCampaign = await db.campaign.update({
      where: {
        id: Number(id),
      },
      data: campaign,
      include: {
        location: true,
        users: true,
      },
    });

    return res
      .status(HttpStatus.Success)
      .json(success({ campaign: updatedCampaign }));
  } catch (err) {
    res
      .status(HttpStatus.ServerError)
      .json(error('An unexpected error has occurred'));
  }
}

export default authenticated({ get, patch });
