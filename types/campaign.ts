import { Campaign, EventStatus, UsersOnCampaigns } from '@prisma/client';

import { Location } from './location';

type CampaignWithRelations = {
  id: number;
  name: string;
  users: UsersOnCampaigns[];
  cityEventStatus: EventStatus;
  roadEventStatus: EventStatus;
  location: Location;
  locationId: number;
};

type CampaignCreateData = Pick<Campaign, 'name'>;
type CampaignUpdateData = Partial<
  Pick<Campaign, 'cityEventStatus' | 'name' | 'roadEventStatus' | 'locationId'>
>;

export type {
  Campaign,
  CampaignWithRelations,
  CampaignCreateData,
  CampaignUpdateData,
};
