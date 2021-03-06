import Link from 'next/link';
import { ReactElement } from 'react';

import Panel from '@/components/Panel';
import Text from '@/components/Text';
import { CampaignWithRelations } from '@/types/campaign';

type Props = {
  campaign: CampaignWithRelations;
};

export default function CampaignTile({ campaign }: Props): ReactElement<Props> {
  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <a className="block">
        <Panel size="full">
          <Text as="h2" appearance="header">
            {campaign.name}
          </Text>
        </Panel>
      </a>
    </Link>
  );
}
