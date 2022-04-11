import { User } from './user';

export type Invitation = {
  id: number;
  createdAt: string;
  declinedAt: Nullable<string>;
  from: User;
  fromId: number;
  to: User;
  toId: number;
};
