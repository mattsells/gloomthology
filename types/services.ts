import { IncomingMessage } from 'http';
import { IronSession } from 'iron-session';
import { NextApiRequest } from 'next';

export type ServiceRequest = IncomingMessage | NextApiRequest | IronSession;
