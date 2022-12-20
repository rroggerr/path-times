import type { NextApiRequest, NextApiResponse } from "next";
import { Train } from "../../types/Train";

interface Schedule {
  upcomingTrains: Train[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Train[]>
) {
  const { len, dir, station } = req.query;
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

  const parsedLen = parseInt(len?.toString() ?? "0", 10);
  const slicedArr = sortedArrivals?.slice(0, parsedLen);
  res.status(200).json(slicedArr);
}
