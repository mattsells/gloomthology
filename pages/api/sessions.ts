import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { unauthenticated } from '@/lib/session/api';
import { User } from '@/types/user';

type Response = {
  user: Nullable<User>;
};

function get(req: NextApiRequest, res: NextApiResponse<Response>) {
  const user = req.session.user || null;
  res.status(200).json({ user });
}

async function post(req: NextApiRequest, res: NextApiResponse<Response>) {
  const user = await db.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  req.session.user = user;

  await req.session.save();

  res.status(200).json({ user });
}

export default unauthenticated({ get, post });
