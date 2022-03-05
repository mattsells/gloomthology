import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { User } from '@/types/user';

type RegistrationResponse = {
  user: Nullable<User>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegistrationResponse>
) {
  // TODO: Update to use controller function
  if (req.method === 'POST') {
    // TODO: Encrypt password
    const user = await db.user.create({
      data: {
        email: req.body.email,
        encryptedPassword: req.body.password,
      },
    });

    res.status(200).json({ user });
  }
}
