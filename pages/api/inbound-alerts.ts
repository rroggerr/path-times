import type { NextApiRequest, NextApiResponse } from 'next';
import { readCache, writeCache } from '../../utils/apiCacheUtil';

const ALERT_KEY = 'alerts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.body));
    writeCache(ALERT_KEY, JSON.stringify(req.body));
    res.status(200).send('Message recieved');
  } else if (req.method === 'GET') {
    const data = await readCache<Object>(ALERT_KEY, 1000000);
    res.status(200).send(JSON.stringify(data));
  }
}
