import { Campaign } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import db from '@/db';
import { sessionOptions } from '@/lib/session/config';

// TODO: MAke reusable util for this
export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const { user } = req.session;

  // Need to check if user is logged in
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

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
}, sessionOptions);

type Props = {
  campaigns: Campaign[];
};

const Campaigns: NextPage<Props> = ({ campaigns }) => {
  return <div>This is the campaigns index </div>;
};

export default Campaigns;
