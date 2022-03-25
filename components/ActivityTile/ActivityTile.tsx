import { ActivityType } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { ReactElement } from 'react';

import Panel from '@/components/Panel';
import Text from '@/components/Text';

import CampaignCreated from './CampaignCreated';
import EventCompleted from './EventCompleted';
import { Props } from './types';

const ActivtyMap: { [Key in ActivityType]: (props: Props) => ReactElement } = {
  [ActivityType.CampaignCreated]: CampaignCreated,
  [ActivityType.EventCompleted]: EventCompleted,
};

function ActivityTile(props: Props) {
  const Component = ActivtyMap[props.activity.type];
  const formattedDate = format(
    parseISO(props.activity.createdAt as unknown as string),
    'LLL d, y'
  );

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
