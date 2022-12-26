import type { NextApiRequest, NextApiResponse } from 'next';
import { readCache, writeCache } from '../../utils/apiCacheUtil';

const ALERT_KEY = 'alerts';

const fetchEmail = async () => {
  const key = process.env.SENDINBLUE_API;
  const resp = await fetch('https://api.sendinblue.com/v3/inbound/events', {
    headers: { 'api-key': key ?? '' },
  });
  const json = await resp.json();
  const emailId = json.events?.[0]?.uuid;

  if (emailId) {
    const emailresp = await fetch(
      `https://api.sendinblue.com/v3/inbound/events/${emailId}`,
      { headers: { 'api-key': key ?? '' } }
    );
    const emailJson = await emailresp.json();
    return emailJson?.subject;
  }
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === 'POST') {
    const subj = await fetchEmail();
    console.log(JSON.stringify(req.body));
    writeCache(ALERT_KEY, subj);
    res.status(200).send('Message recieved');
  } else if (req.method === 'GET') {
    const data = await readCache<Object>(ALERT_KEY, 1000000);
    res.status(200).send(JSON.stringify(data));
  }
}
