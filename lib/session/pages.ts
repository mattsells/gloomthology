import { withIronSessionSsr } from 'iron-session/next';

import { sessionOptions } from './config';

type Handler = ReturnType<typeof withIronSessionSsr>;

export async function authenticated(handler: Handler) {
  return withIronSessionSsr((args) => {
    const { user } = args.req.session;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }

    return handler(args);
  }, sessionOptions);
}
