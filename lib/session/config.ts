export const sessionOptions = {
  cookieName: process.env.COOKIE_NAME as string,
  password: process.env.COOKIE_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
