import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import { sessionOptions } from '@/lib/session/config';

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

const Parties: NextPage = ({ user }) => {
  // const { user } = useSession();

  console.log('user is', user);

  return <div>This is the party page</div>;
};

export default Parties;
