import { Campaign, Prisma } from '@prisma/client';

const campaignWithRelations = Prisma.validator<Prisma.CampaignArgs>()({
  include: {
    activities: true,
    location: true,
    users: true,
  },
});

type CampaignWithRelations = Prisma.CampaignGetPayload<
  typeof campaignWithRelations
>;

export type { Campaign, CampaignWithRelations };
