import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import Button from '@/components/Button';
import Panel from '@/components/Panel';
import Text from '@/components/Text';
import db from '@/db';
import { sessionOptions } from '@/lib/session/config';
import { Scenario } from '@/types/scenario';

export const getServerSideProps = withIronSessionSsr(async ({ req, query }) => {
  const { user } = req.session;
  const { id } = query;

  // Need to check if user is logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  const scenario = await db.scenario.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      location: true,
    },
  });

  return {
    props: {
      scenario,
    },
  };
}, sessionOptions);

type Props = {
  scenario: Scenario;
};

const ScenarioShow: NextPage<Props> = ({ scenario }) => {
  return (
    <>
      <Text as="h1" appearance="header" className="mb-4">
        {scenario.location.name}
      </Text>

      <Panel>
        <Button>Complete Scenario</Button>
      </Panel>
    </>
  );
};

export default ScenarioShow;
