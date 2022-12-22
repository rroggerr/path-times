import type { NextApiRequest, NextApiResponse } from 'next';
import { Schedule } from '../../types/Api';
import { Train } from '../../types/Train';
import { readCache, writeCache } from '../../utils/apiCacheUtil';
import { isValidStation } from '../../utils/filterStation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Train[] | string>
) {
  const { dir, station } = req.query;
  let cacheHit = false;

  if (typeof station !== 'string' || !isValidStation(station)) {
    console.warn(`[Invalid Station]: ${station}`, { req });
    res.status(404).send('No station found');
    return;
  }

  let cachedTrains: Schedule;
  try {
    cachedTrains = await readCache(station);
    cacheHit = true;
  } catch {
    const url = `https://path.api.razza.dev/v1/stations/${station}/realtime`;
    const resp = await fetch(url);
    const json: Schedule = await resp.json();
    cachedTrains = json;
    await writeCache(station, json);
  }

  const trains = cachedTrains?.upcomingTrains ?? [];

  const filteredTrains = dir
    ? trains.filter(({ direction }) => direction === dir)
    : trains;
  const sortedArrivals = filteredTrains.sort((a, b) =>
    a.projectedArrival > b.projectedArrival ? 1 : -1
  );

  res.setHeader('X-STATION-CACHE', cacheHit ? 'HIT' : 'MISS');
  res.status(200).json(sortedArrivals);
}
