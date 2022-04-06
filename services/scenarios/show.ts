import db from '@/db';
import { HttpStatus } from '@/lib/http';
import { ServiceError } from '@/lib/services/ServiceError';
import { authorize } from '@/policies/campaign';
import { SessionUser } from '@/types/user';
import { fallbackKey } from '@/utils/api';
import { to } from '@/utils/url';

type Args<T extends SessionUser = SessionUser> = {
  id: number;
  user: T;
};

export async function show<T extends SessionUser>({ id, user }: Args<T>) {
  const scenario = await db.scenario.findUnique({
    where: {
      id,
    },
    include: {
      campaign: true,
      location: true,
    },
  });

  if (!scenario) {
    throw new ServiceError('Record not found', HttpStatus.NotFound);
  }

  const { isAllowed } = await authorize(scenario.campaignId, user);

  if (!isAllowed) {
    throw new ServiceError(
      'Not allowed to view this record',
      HttpStatus.Forbidden
    );
  }

  const url = to.scenario(id);
  const fallback = fallbackKey(url, {
    include: {
      campaign: true,
      location: true,
    },
  });

  console.log('FALLBACK KEY', fallback);

  return { fallback, scenario };
}
