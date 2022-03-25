import { Activity } from '@prisma/client';

import { Campaign } from '@/types/campaign';

export type Props = {
  activity: Activity;
  campaign: Campaign;
};
