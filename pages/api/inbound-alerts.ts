import type { NextApiRequest, NextApiResponse } from 'next';
import { readCache, writeCache } from '../../utils/apiCacheUtil';

const ALERT_KEY = 'alerts';
const ONE_HOUR_TTL = 3600000;
const WHITELIST_EMAIL = [
  'rogers5thadress@gmail.com',
  'example.sender@mandrillapp.com',
  'noreply@everbridge.net',
];

const processEmail = (body: any): string => {
  const parsedEvents = JSON.parse(body.mandrill_events);
  const resp = parsedEvents[0].msg.text;
  return resp;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === 'POST') {
    const text = processEmail(req.body).replace('\n', ' ');
    await writeCache(ALERT_KEY, text);
    res.status(200).send('Message recieved');
  } else if (req.method === 'GET') {
    const data = await readCache<Object>(ALERT_KEY, ONE_HOUR_TTL);
    res.status(200).send(JSON.stringify(data));
  } else res.status(200).send('Fallthru');
}
