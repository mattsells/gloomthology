import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { HttpStatus } from '@/lib/http';
import { error, success } from '@/lib/http/response';
import { authenticated } from '@/lib/session/api';

async function patch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { scenario } = req.body;

    const updatedScenario = await db.scenario.update({
      where: {
        id: Number(id),
      },
      data: scenario,
    });

    return res
      .status(HttpStatus.Success)
      .json(success({ scenario: updatedScenario }));
  } catch (err) {
    res
      .status(HttpStatus.ServerError)
      .json(error('An unexpected error has occurred'));
  }
}

export default authenticated({ patch });
