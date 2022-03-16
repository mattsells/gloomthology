import { Location, Prisma } from '@prisma/client';

const locationCreateArgs = Prisma.validator<Prisma.LocationArgs>()({
  select: {
    name: true,
    tag: true,
  },
});

type LocationCreateArgs = Prisma.CampaignGetPayload<typeof locationCreateArgs>;

export type { Location, LocationCreateArgs };
