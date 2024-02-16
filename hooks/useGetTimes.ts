import useSWR, { SWRResponse } from 'swr';
import { Train, Direction } from '../types/Train';
import {Station} from '../types/Station'
import { useRef } from 'react';

interface Params {
  station: Station;
  dir?: Direction;
  len?: number;
}

export const useGetTimes = ({ station, dir }: Params): SWRResponse<Train[]> => {
  const prevData = useRef<Train[]>();
  const resp = useSWR(
    `/api/trains?dir=${dir}&station=${station}`,
    (url: string) => fetch(url).then((resp) => resp.json()),
    { refreshInterval: 5000 }
  );

  if (resp.data && resp.data.length > 0 && resp.data !== prevData) {
    prevData.current = resp.data;
  }

  return { ...resp, data: resp.data.length > 0 ? resp.data : prevData.current };
};
