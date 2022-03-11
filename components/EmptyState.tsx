import { ReactElement } from 'react';

import Text from '@/components/Text';

type Props = {
  text: string;
};

export default function EmptyState({ text }: Props): ReactElement<Props> {
  return (
    <div className="text-center">
      <Text as="h2" appearance="header">
        {text}
      </Text>
    </div>
  );
}
