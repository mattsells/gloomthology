import { User } from '@/types/user';

declare module 'iron-session' {
  interface IronSessionData {
    user: Nullable<User>;
  }
}
