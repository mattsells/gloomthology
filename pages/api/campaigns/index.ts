import { ActivityType, Role } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { error, failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import CampaignSchema from '@/schemas/campaign';
import { Locations } from '@/types/location';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const userCampaigns = await db.usersOnCampaigns.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    include: {
      campaign: true,
    },
  });

  const campaigns = userCampaigns.map((userCampaign) => userCampaign.campaign);

  return res.status(HttpStatus.Success).json(success({ campaigns }));
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body.campaign;

    await CampaignSchema.validate(data);

    const location = await db.location.findFirst({
      where: {
        tag: Locations.Home,
      },
    });

    if (!location) {
      return res
        .status(HttpStatus.ServerError)
        .json(error('Unable to create campaign'));
    }

    const campaign = await db.campaign.create({
      data: {
        ...data,
        locationId: location.id,
        users: {
          create: [
            {
              userId: req.session.user!.id,
              role: Role.Owner,
            },
          ],
        },
        activities: {
          create: [
            {
              data: {},
              type: ActivityType.CampaignCreated,
            },
          ],
        },
      },
      include: {
        activities: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        location: true,
        users: true,
      },
    });

    if (!campaign) {
      return res
        .status(HttpStatus.ServerError)
        .json(error('Unable to create campaign'));
    }

    res.status(HttpStatus.Created).json(success({ campaign }));
  } catch (err) {
    console.log('error', err);
  }
}

export default authenticated({ get, post });
