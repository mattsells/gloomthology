import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  email: string;
  name: Nullable<string>;
};

type RegistrationResponse = {
  user: Nullable<User>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegistrationResponse>
) {
  // TODO: Update to use controller function
  if (req.method === 'POST') {
    console.log('body', req.body);

    const client = new PrismaClient();

    // TODO: Encrypt password
    const user = await client.user.create({
      data: {
        email: req.body.email,
        encryptedPassword: req.body.password,
      },
    });

    res.status(200).json({ user });
  }
}
