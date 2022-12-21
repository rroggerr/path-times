import useSWR, { SWRResponse } from "swr";
import { Train, Direction } from "../types/Train";
import {Station} from '../types/Station'

interface Params {
  station: Station;
  dir?: Direction;
  len?: number;
}

export const useGetTimes = ({
  station,
  dir,
  len = 3,
}: Params): SWRResponse<Train[]> => {
  return useSWR(
    `/api/trains?dir=${dir}&len=${len}&station=${station}`,
    (url: string) => fetch(url).then((resp) => resp.json()),
    { refreshInterval: 20000 }
  );
};
