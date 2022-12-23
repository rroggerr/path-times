import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (req.method === 'POST') {
    console.log(req.body);
  }
  res.status(200).send('Message recieved');
}
