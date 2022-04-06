import { SessionUser } from '@/types/user';

import { UnauthorizedError } from './UnauthorizedError';

export function authenticate(req: any): SessionUser {
  const { user } = req.session;

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
}
