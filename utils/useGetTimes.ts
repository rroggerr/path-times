import useSWR from "swr";
import { Train, Direction, Station, MappedTrain } from "../types/Train";

interface Schedule {
  upcomingTrains: Train[];
}

interface Params {
  station: Station;
  dir?: Direction;
  len?: number;
}

export const useGetTimes = ({
  station,
  dir,
  len = 3,
}: Params): MappedTrain[] => {
  const { data } = useSWR<Schedule>(
    `https://path.api.razza.dev/v1/stations/${station}/realtime`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 20000 }
  );

  const trains = data?.upcomingTrains ?? [];

  const filteredTrains = dir
    ? trains.filter(({ direction }) => direction === dir)
    : trains;
  const mappedRes = filteredTrains?.map((train) => ({
    ...train,
    projectedArrival: new Date(train.projectedArrival),
    lastUpdated: new Date(train.lastUpdated),
  }));

  return mappedRes?.slice(0, len);
};
