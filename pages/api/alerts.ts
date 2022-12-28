import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'node-html-parser';
import { readCache, writeCache } from '../../utils/apiCacheUtil';

const ALERT_KEY = 'alerts';
const ONE_HOUR_TTL = 3600000;

const fetchTwitter = async (): Promise<string> => {
  const html = await (
    await fetch('https://www.twitter.com/PATHAlerts', {
      headers: {
        'User-Agent': 'bing' + 'bot',
      },
    })
  ).text();
  const parsed = parse(html);
  const firstTweet = parsed.querySelectorAll('[data-testid="tweetText"]')[0];
  const tweetText = firstTweet.firstChild.textContent;
  return tweetText;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === 'GET') {
    try {
      const data = await readCache<string>(ALERT_KEY, ONE_HOUR_TTL);
      res.status(200).send(data);
    } catch (err) {
      const fetchedData = await fetchTwitter();
      writeCache(ALERT_KEY, fetchedData);
      res.status(200).send(fetchedData);
    }
  } else res.status(200).send('Fallthru');
}
