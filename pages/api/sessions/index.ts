import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { failure, success } from '@/lib/http/response';
import HttpStatus from '@/lib/http/status';
import { unauthenticated } from '@/lib/session/api';

function get(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user || null;
  res.status(HttpStatus.Success).json(success({ user }));
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body.session;

  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      encryptedPassword: true,
      name: true,
    },
  });

  if (!user) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure({ user: 'User not found with the provided email' }));
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.encryptedPassword
  );

  if (!isPasswordValid) {
    return res
      .status(HttpStatus.Unauthorized)
      .json(failure({ user: 'Password is not valid' }));
  }

  const { encryptedPassword, ...sessionUser } = user;

  req.session.user = sessionUser;

  await req.session.save();

  res.status(HttpStatus.Success).json(success({ user: sessionUser }));
}

function destroy(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(HttpStatus.NoContent).json(success(null));
}

export default unauthenticated({ get, post, delete: destroy });
