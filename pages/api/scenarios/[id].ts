import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { toApiResponse } from '@/lib/api/error';
import { authenticate } from '@/lib/auth/authenticate';
import { HttpStatus } from '@/lib/http';
import { error, success } from '@/lib/http/response';
import { authenticated } from '@/lib/session/api';
import * as ScenarioService from '@/services/scenarios';

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = authenticate(req);
    const id = Number(req.query.id);

    const { scenario } = await ScenarioService.show({ id, user });

    return res.status(HttpStatus.Success).json(
      success({
        scenario,
      })
    );
  } catch (err) {
    const { data, status } = toApiResponse(err);

    return res.status(status).json(data);
  }
}

async function patch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { scenario } = req.body;

    const updatedScenario = await db.scenario.update({
      where: {
        id: Number(id),
      },
      data: scenario,
      include: {
        campaign: true,
        location: true,
      },
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

export default authenticated({ get, patch });
