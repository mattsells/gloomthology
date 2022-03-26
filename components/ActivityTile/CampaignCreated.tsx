import { ReactElement } from 'react';

import Text from '@/components/Text';

import { Props } from './types';

export default function CampaignCreated({
  campaign,
}: Props): ReactElement<Props> {
  return (
    <Text as="p" appearance="body">
      {campaign.name} is founded!
    </Text>
  );
}
