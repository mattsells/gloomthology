import { ActivityWithData } from '@/types/activity';
import { CampaignWithRelations } from '@/types/campaign';

export type Props<T = any> = {
  activity: ActivityWithData<T>;
  campaign: CampaignWithRelations;
};
