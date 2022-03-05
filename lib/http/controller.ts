import type { NextApiRequest, NextApiResponse } from 'next';

type Handler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => void | Promise<void>;

type RequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Actions = {
  [Key in Lowercase<RequestType>]?: Handler;
};

export default function controller(actions: Actions): Handler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.method) {
      throw new Error('Contoller can only be used in a server request');
    }

    const type = req.method.toLowerCase() as Lowercase<RequestType>;
    const action = actions[type];

    if (!action) {
      throw new Error(`No action provided for method ${req.method}`);
    }

    return action(req, res);
  };
}
