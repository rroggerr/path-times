import type { NextApiRequest, NextApiResponse } from 'next';
import { Alert } from '../../types/Alert';
import { readCache, writeCache } from '../../utils/apiCacheUtil';

const ALERT_KEY = 'alerts';
const ONE_HOUR_TTL = 3600000;

const fetchAlerts = async (): Promise<Alert[]> => {
  const res = await(
    await fetch(
      'https://www.panynj.gov/bin/portauthority/everbridge/incidents?status=All&department=Path',
      {
        headers: {
          accept: 'application/json',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'sec-ch-ua':
            '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        },
        referrer: 'https://www.panynj.gov/path/en/alerts.html',
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'GET',
        mode: 'cors',
      }
    )
  ).json();
  return res?.data ?? [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Alert[]>
) {
  if (req.method === 'GET') {
    let fetchedData = [];
    try {
      const data = await readCache<Alert[]>(ALERT_KEY, ONE_HOUR_TTL);
      fetchedData = data;
    } catch (err) {
      console.log(err);
      const alertsJson = await fetchAlerts();
      writeCache(ALERT_KEY, alertsJson);
      fetchedData = alertsJson;
    }
    res.status(200).json(fetchedData);
  } else res.status(200).send([]);
}
