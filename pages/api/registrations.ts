import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { unauthenticated } from '@/lib/session/api';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const existingUser = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (existingUser) {
    return res
      .status(HttpStatus.Conflict)
      .json(failure({ user: 'A user exists with the provided emaul' }));
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await db.user.create({
    data: {
      email: req.body.email,
      encryptedPassword,
    },
  });

  res.status(HttpStatus.Created).json(success({ user }));
}

export default unauthenticated({ post });
