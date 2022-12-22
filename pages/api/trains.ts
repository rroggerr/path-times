import type { NextApiRequest, NextApiResponse } from 'next';
import { Train } from '../../types/Train';
import { isValidStation } from '../../utils/filterStation';

interface Schedule {
  upcomingTrains: Train[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Train[] | string>
) {
  const { dir, station } = req.query;

  if (typeof station !== 'string' || !isValidStation(station)) {
    res.status(404).send('No station found');
    return;
  }

  const url = `https://path.api.razza.dev/v1/stations/${station}/realtime`;
  const resp = await fetch(url);
  const json: Schedule = await resp.json();

  const trains = json?.upcomingTrains ?? [];

  const filteredTrains = dir
    ? trains.filter(({ direction }) => direction === dir)
    : trains;
  const sortedArrivals = filteredTrains.sort((a, b) =>
    a.projectedArrival > b.projectedArrival ? 1 : -1
  );

  res.status(200).json(sortedArrivals);
}
