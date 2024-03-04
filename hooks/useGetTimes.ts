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
  const { data } = resp ?? {};

  if (data?.length > 0 && data !== prevData) {
    prevData.current = data;
  }

  return { ...resp, data: data?.length > 0 ? data : prevData.current };
};
