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

const Parties: NextPage = () => {
  // const { user } = useSession();

  return <div>This is the party page</div>;
};

export default Parties;
