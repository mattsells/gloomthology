import { ScenarioResult } from '@prisma/client';
import { ReactElement } from 'react';
import { GiArrowWings, GiPirateGrave } from 'react-icons/gi';
import {
  classnames,
  fontSize,
  padding,
  textColor,
} from 'tailwindcss-classnames';

import Text from '@/components/Text';
import { ScenarioCompletedActivityData } from '@/types/activity';

import { Props } from './types';

const styles = {
  icon: (result: ScenarioResult) =>
    classnames(
      padding('pt-1', 'pr-2'),
      fontSize('text-lg'),
      textColor({
        ['text-rose-500']: result === ScenarioResult.Failed,
        ['text-lime-400']: result === ScenarioResult.Success,
      })
    ),
};

export default function CampaignCreated({
  activity,
}: Props<ScenarioCompletedActivityData>): ReactElement<
  Props<ScenarioCompletedActivityData>
> {
  return (
    <div className="flex flex-row">
      <div className={styles.icon(activity.data.result)}>
        {activity.data.result === ScenarioResult.Success ? (
          <GiArrowWings />
        ) : (
          <GiPirateGrave />
        )}
      </div>

      <div>
        <Text as="p" appearance="label">
          Scenario
        </Text>

        <Text as="p" appearance="small" className="mb-2">
          {activity.data.locationName}
        </Text>

        <Text as="p" appearance="label">
          Result
        </Text>

        <Text as="p" appearance="small">
          {activity.data.result}
        </Text>
      </div>
    </div>
  );
}
