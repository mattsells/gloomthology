import { ReactElement } from 'react';
import { GiTread } from 'react-icons/gi';

import Text from '@/components/Text';
import { TraveledActivityData } from '@/types/activity';

import { Props } from './types';

export default function Traveled({
  activity,
}: Props<TraveledActivityData>): ReactElement<Props<TraveledActivityData>> {
  return (
    <div className="flex flex-row">
      <div className="pt-1 pr-2 text-emerald-500 text-lg">
        <GiTread />
      </div>

      <Text as="p" appearance="small">
        Traveled from {activity.data.fromName} to {activity.data.toName}
      </Text>
    </div>
  );
}
