import useSWR from 'swr';

const FALLBACK_TEXT =
  'No food or beverages of any kind, in any type of container, open or closed, will be permitted on board trains during this time.';

export const useAlerts = (): string => {
  const { data, isLoading, error } = useSWR<string>(
    '/api/alerts',
    (url: string) => fetch(url).then((resp) => resp.text()),
    { refreshInterval: 60000 }
  );

  if (error) {
    return FALLBACK_TEXT;
  }

  if (!data && !isLoading) {
    return FALLBACK_TEXT;
  }

  return data ?? '';
};
