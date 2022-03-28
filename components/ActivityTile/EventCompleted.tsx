import { ReactElement } from 'react';
import { GiSpookyHouse, GiTreasureMap } from 'react-icons/gi';

import Text from '@/components/Text';
import { EventCompletedActivityData } from '@/types/activity';
import { Locations } from '@/types/location';

import { Props } from './types';

export default function CampaignCreated({
  activity,
}: Props<EventCompletedActivityData>): ReactElement<
  Props<EventCompletedActivityData>
> {
  const isHome = activity.data?.locationTag === Locations.Home;

  const label = isHome
    ? 'While in Gloomhaven...'
    : `On the road to ${activity.data.locationName}...`;

  return (
    <div className="flex flex-row">
      <div className="pt-1 pr-2 text-violet-500 text-lg">
        {isHome ? <GiSpookyHouse /> : <GiTreasureMap />}
      </div>

      <div>
        <Text as="p" appearance="label">
          {label}
        </Text>

        <Text as="p" appearance="small">
          {activity.data.text}
        </Text>
      </div>
    </div>
  );
}
