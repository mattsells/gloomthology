import { Campaign, Location, ScenarioResult } from '@prisma/client';

export type Scenario = {
  id: number;
  campaign: Campaign;
  campaignId: string;
  completedAt: Nullable<string>;
  location: Location;
  result: ScenarioResult;
};

export type ScenarioUpdateData = {
  completedAt?: Nullable<string>;
  result?: ScenarioResult;
};
