import { ReactElement } from 'react';
import { GiGavel } from 'react-icons/gi';

import Text from '@/components/Text';

import { Props } from './types';

export default function CampaignCreated({
  campaign,
}: Props): ReactElement<Props> {
  return (
    <div className="flex flex-row">
      <div className="pt-1 pr-2 text-yellow-500 text-lg">
        <GiGavel />
      </div>

      <Text as="p" appearance="small">
        {campaign.name} is founded!
      </Text>
    </div>
  );
}
