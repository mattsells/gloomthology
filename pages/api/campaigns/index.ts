import { Role } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { error, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';
import CampaignSchema from '@/schemas/campaign';
import { Locations } from '@/types/location';

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

export default authenticated({ post });
