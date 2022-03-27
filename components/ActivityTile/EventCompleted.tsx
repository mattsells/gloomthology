import { ReactElement } from 'react';

import Text from '@/components/Text';
import { EventCompletedActivityData } from '@/types/activity';
import { Locations } from '@/types/location';

import { Props } from './types';

export default function CampaignCreated({
  activity,
}: Props<EventCompletedActivityData>): ReactElement<
  Props<EventCompletedActivityData>
> {
  const label =
    activity.data?.locationTag === Locations.Home
      ? 'While in Gloomhaven...'
      : `On the road to ${activity.data.locationName}`;

  return (
    <>
      <Text as="p" appearance="label">
        {label}
      </Text>

      <Text as="p" appearance="body">
        {activity.data.text}
      </Text>
    </>
  );
}
