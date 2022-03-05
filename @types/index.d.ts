import { IronSession } from 'iron-session';

import type { User } from '@/types/user';

// interface IronSessionData {
//   user: Nullable<User>;
// }

// declare module 'http' {
//   interface IncomingMessage {
//     session: {
//       user: Nullable<User>;
//     } & IronSession;
//   }
// }

// Global types
declare global {
  type Nullable<T> = T | null;
}
