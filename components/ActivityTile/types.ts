import { ActivityData, ActivityWithData } from '@/types/activity';
import { Campaign } from '@/types/campaign';

export type Props<T = ActivityData> = {
  activity: ActivityWithData<T>;
  campaign: Campaign;
};
