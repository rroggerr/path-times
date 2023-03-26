import useSWR from 'swr';
import { Alert } from '../types/Alert';

export const useAlerts = (): Alert[] => {
  const { data, error } = useSWR<Alert[]>(
    '/api/alerts',
    (url: string) => fetch(url).then((resp) => resp.json()),
    { refreshInterval: 60000 }
  );

  if (error) {
    return [];
  }

  return data ?? [];
};
