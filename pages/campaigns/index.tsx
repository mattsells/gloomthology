import { Campaign } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import db from '@/db';
import { authenticated } from '@/lib/session/pages';

export const getServerSideProps = authenticated(async ({ req }) => {
  const { user } = req.session;

  const userCampaigns = await db.usersOnCampaigns.findMany({
    where: {
      userId: {
        equals: user.id,
      },
    },
    include: {
      campaign: true,
    },
  });

  const campaigns = userCampaigns.map((userCampaign) => userCampaign.campaign);

  return {
    props: {
      campaigns,
      user: req.session.user,
    },
  };
});

type Props = {
  campaigns: Campaign[];
};

const Campaigns: NextPage<Props> = ({ campaigns }) => {
  return <div>This is the campaigns index </div>;
};

export default Campaigns;
