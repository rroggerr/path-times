import type { NextApiRequest, NextApiResponse } from 'next';
import { Train } from '../../types/Train';
import { isValidStation } from '../../utils/filterStation';
import { readStation } from '../../db/station';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Train[] | string>
) {
  const { dir, station } = req.query;

  if (typeof station !== 'string' || !isValidStation(station)) {
    console.warn(`[Invalid Station]: ${station}`, { req });
    res.status(404).send('No station found');
    return;
  }

  const resp = await readStation(station);
  const trains = resp?.upcomingTrains ?? [];

  const filteredTrains = dir
    ? trains.filter(({ direction }) => direction === dir)
    : trains;
  const sortedArrivals = filteredTrains.sort((a, b) =>
    a.projectedArrival > b.projectedArrival ? 1 : -1
  );

  res.status(200).json(sortedArrivals);
}
