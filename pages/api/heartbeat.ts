import type { NextApiRequest, NextApiResponse } from 'next';

const ALLOWED_USER_AGENT = 'pi-ping';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (req.headers['user-agent'] === ALLOWED_USER_AGENT) {
      res.status(200).send('OK');
    }
  }
}
