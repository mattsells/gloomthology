import { Activity } from '@prisma/client';

export type ActivityWithData<T = ActivityData> = Omit<Activity, 'data'> & {
  data: T;
};

export type ActivityData = EventCompletedActivityData;

export type EventCompletedActivityData = {
  locationName: string;
  locationTag: string;
  text: string;
};
