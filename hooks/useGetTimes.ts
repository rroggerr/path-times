import useSWR from "swr";
import { Train, Direction, Station } from "../types/Train";

interface Params {
  station: Station;
  dir?: Direction;
  len?: number;
}

export const useGetTimes = ({ station, dir, len = 3 }: Params): Train[] => {
  const { data } = useSWR(
    `/api/trains/?dir=${dir}&len=${len}&station=${station}`,
    (url: string) => fetch(url).then((resp) => resp.json()),
    { refreshInterval: 20000 }
  );
  return data ?? [];
};