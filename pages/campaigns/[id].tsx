import { Campaign } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next/types';

import db from '@/db';
import { sessionOptions } from '@/lib/session/config';

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

  const campaign = await db.campaign.findUnique({
    where: {
      id: Number(id),
    },
  });

  // TODO: Make sure you can view the campaign

  if (!campaign) {
    // TODO: redirect to 404
  }

  return {
    props: {
      campaign,
      user: req.session.user,
    },
  };
}, sessionOptions);

type Props = {
  campaign: Campaign;
};

const CampaignShow: NextPage<Props> = ({ campaign }) => {
  return <div>Ths is the campaign view {JSON.stringify(campaign)}</div>;
};

export default CampaignShow;
