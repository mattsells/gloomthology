import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { unauthenticated } from '@/lib/session/api';
import { User } from '@/types/user';

type RegistrationResponse = {
  user: Nullable<User>;
};

async function post(
  req: NextApiRequest,
  res: NextApiResponse<RegistrationResponse>
) {
  // TODO: Encrypt password
  const user = await db.user.create({
    data: {
      email: req.body.email,
      encryptedPassword: req.body.password,
    },
  });

  res.status(200).json({ user });
}

export default unauthenticated({ post });
