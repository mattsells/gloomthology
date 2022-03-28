import { ActivityType } from '@prisma/client';
import React from 'react';
import { ReactElement } from 'react';

import Text from '@/components/Text';
import { formatDate } from '@/utils/date';

import CampaignCreated from './CampaignCreated';
import EventCompleted from './EventCompleted';
import Traveled from './Traveled';
import { Props } from './types';

const ActivtyMap: { [Key in ActivityType]: (props: Props) => ReactElement } = {
  [ActivityType.CampaignCreated]: CampaignCreated,
  [ActivityType.EventCompleted]: EventCompleted,
  [ActivityType.Traveled]: Traveled,
};

function ActivityTile(props: Props) {
  const Component = ActivtyMap[props.activity.type];
  const formattedDate = formatDate(props.activity.createdAt);

  return (
    <div className="rounded bg-zinc-900 p-3">
      <Component {...props} />

      <div className="mt-2">
        <Text as="span" appearance="label">
          {formattedDate}
        </Text>
      </div>
    </div>
  );
}

export default React.memo(ActivityTile);
