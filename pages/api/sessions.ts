import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/db';
import { sessionOptions } from '@/lib/session/config';

type Data = {
  name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const user = req.session.user || null;

    res.status(200).json({ user });
  } else if (req.method === 'POST') {
    // TODO: Check for password
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // TODO: Update how this works
    req.session.user = user;

    await req.session.save();

    console.log('user in session', user);
    res.status(200).json({ user });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
