import { withIronSessionApiRoute } from 'iron-session/next';

import type { Actions } from '@/lib/http/controller';
import controller from '@/lib/http/controller';

import { sessionOptions } from './config';

export async function authenticated(actions: Actions) {
  // TODO: Check for user and if not present return error
  const handler = controller(actions);

  return withIronSessionApiRoute(handler, sessionOptions);
}

export function unauthenticated(actions: Actions) {
  const handler = controller(actions);

  return withIronSessionApiRoute(handler, sessionOptions);
}
