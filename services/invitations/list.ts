import db from '@/db';
import { SessionUser } from '@/types/user';

type Args<T extends SessionUser = SessionUser> = {
  user: T;
};

export async function list<T extends SessionUser>({ user }: Args<T>) {
  const sentInvitations = await db.invitation.findMany({
    where: {
      fromId: user.id,
    },
    include: {
      from: true,
      to: true,
    },
  });

  const receivedInvitations = await db.invitation.findMany({
    where: {
      toId: user.id,
    },
    include: {
      from: true,
      to: true,
    },
  });

  return { receivedInvitations, sentInvitations };
}
