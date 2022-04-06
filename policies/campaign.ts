import { Role } from '@prisma/client';

import db from '@/db';
import { SessionUser } from '@/types/user';

type Authorization = {
  isAllowed: boolean;
  role: Nullable<Role>;
};

export async function authorize<T extends SessionUser>(
  id: number,
  user: T
): Promise<Authorization> {
  const campaign = await db.campaign.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });

  if (!campaign) {
    return {
      isAllowed: false,
      role: null,
    };
  }

  const campaignUser = campaign.users.find(
    (campaignUser) => campaignUser.userId === user.id
  );

  if (!campaignUser) {
    return {
      isAllowed: false,
      role: null,
    };
  }

  return {
    isAllowed: true,
    role: campaignUser.role,
  };
}
