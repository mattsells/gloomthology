import { SessionUser } from '@/types/user';

declare module 'iron-session' {
  interface IronSessionData {
    user: Nullable<SessionUser>;
  }
}
