import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import { sessionOptions } from '@/lib/session/config';

// TODO: MAke reusable util for this
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.user,
      },
      ...(!req.session.user && {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      }),
    };
  },
  sessionOptions
);

const Campaigns: NextPage = () => {
  return <div>This is the campaigns index</div>;
};

export default Campaigns;
