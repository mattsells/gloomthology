import { ReactElement } from 'react';

import Text from '@/components/Text';

import { Props } from './types';

export default function CampaignCreated({
  activity,
}: Props): ReactElement<Props> {
  return (
    <>
      <Text as="p" appearance="body">
        An event was completed!
      </Text>
    </>
  );
}
