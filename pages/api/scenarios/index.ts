import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { error, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { authenticated } from '@/lib/session/api';

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body.scenario;

    const scenario = await db.scenario.create({
      data,
    });

    if (!scenario) {
      return res
        .status(HttpStatus.ServerError)
        .json(error('Unable to create scenario'));
    }

    res.status(HttpStatus.Created).json(success({ scenario }));
  } catch (err) {
    console.log('error', err);
  }
}

export default authenticated({ post });
