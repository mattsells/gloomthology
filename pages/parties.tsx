import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from 'next';

import useSession from '@/hooks/useSession';

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
  {
    cookieName: 'myapp_cookiename',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  }
);

const Parties: NextPage = ({ user }) => {
  // const { user } = useSession();

  console.log('user is', user);

  return <div>This is the party page</div>;
};

export default Parties;
