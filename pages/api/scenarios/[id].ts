import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { HttpStatus } from '@/lib/http';
import { error, failure, success } from '@/lib/http/response';
import { authenticated } from '@/lib/session/api';

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { id } = req.query;

  // Need to check if user is logged in
  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure('You are not logged in'));
  }

  const scenario = await db.scenario.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      campaign: true,
      location: true,
    },
  });

  if (!scenario) {
    return res.status(HttpStatus.NotFound).json(failure('Scenario not found'));
  }

  return res.status(HttpStatus.Success).json(
    success({
      scenario,
    })
  );
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
