import { Activity, ScenarioResult } from '@prisma/client';

export type ActivityWithData<T = any> = Omit<Activity, 'data'> & {
  data: T;
};

export type EventCompletedActivityData = {
  locationName: string;
  locationTag: string;
  text: string;
};

export type TraveledActivityData = {
  fromName: string;
  fromId: string;
  toName: string;
  toId: string;
};

export type ScenarioCompletedActivityData = {
  locationName: string;
  locationTag: string;
  result: ScenarioResult;
};
