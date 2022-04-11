import db from '@/db';
import { SessionUser } from '@/types/user';

type Args<T extends SessionUser = SessionUser> = {
  user: T;
};

export async function list<T extends SessionUser>({ user }: Args<T>) {
  const connections = await db.connection.findMany({
    where: {
      userId: user.id,
    },
    include: {
      contact: true,
    },
  });

  return { connections };
}
