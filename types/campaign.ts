import { Campaign, EventStatus, UsersOnCampaigns } from '@prisma/client';

import { Location } from './location';

type CampaignWithRelations = {
  name: string;
  users: UsersOnCampaigns[];
  cityEventStatus: EventStatus;
  roadEventStatus: EventStatus;
  location: Location;
  locationId: number;
};

export type { Campaign, CampaignWithRelations };
