import { Prisma, User } from '@prisma/client';

const userSessionArgs = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    name: true,
  },
});

type SessionUser = Prisma.UserGetPayload<typeof userSessionArgs>;

export type { SessionUser, User };
