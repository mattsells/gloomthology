import { EventStatus } from '@prisma/client';
import { ReactElement } from 'react';
import { classnames, textColor } from 'tailwindcss-classnames';

import Button from '@/components/Button';
import Text from '@/components/Text';
import { CampaignWithRelations } from '@/types/campaign';
import { Locations } from '@/types/location';
import { titleize } from '@/utils/string';

type Type = 'city' | 'road';

type Props = {
  campaign: CampaignWithRelations;
  onClickStart: VoidFunction;
};

const styles = {
  root: (isComplete: boolean) => {
    return classnames(
      textColor({ 'text-rose-500': !isComplete, 'text-lime-400': isComplete })
    );
  },
};

export default function EventActions({
  campaign,
  onClickStart,
}: Props): ReactElement<Props> {
  const type: Type = campaign.location.tag === Locations.Home ? 'city' : 'road';
  const status = campaign[`${type}EventStatus`];
  const isComplete = status === EventStatus.COMPLETE;

  return (
    <tr>
      <td className="p-3">
        <Text appearance="body">Event Status:</Text>
      </td>
      <td className="p-3">
        <Text appearance="body" className={styles.root(isComplete)}>
          {titleize(status)}
        </Text>
      </td>
      <td className="p-3 text-right">
        <Button className="w-full" disabled={isComplete} onClick={onClickStart}>
          Begin {titleize(type)} Event
        </Button>
      </td>
    </tr>
  );
}
