import db from '@/db';
import { HttpStatus } from '@/lib/http';
import { ServiceError } from '@/lib/services/ServiceError';
import { SessionUser } from '@/types/user';

type Args<T extends SessionUser = SessionUser> = {
  email: string;
  user: T;
};

export async function create<T extends SessionUser>({ email, user }: Args<T>) {
  const player = await db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (!player) {
    throw new ServiceError(
      `No user found with provided email address: '${email}'`,
      HttpStatus.NotFound
    );
  }

  const invitation = await db.invitation.create({
    data: {
      fromId: user.id,
      toId: player.id,
    },
  });

  return { invitation };
}
