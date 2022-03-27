import { ActivityData, ActivityWithData } from '@/types/activity';
import { CampaignWithRelations } from '@/types/campaign';

export type Props<T = ActivityData> = {
  activity: ActivityWithData<T>;
  campaign: CampaignWithRelations;
};
