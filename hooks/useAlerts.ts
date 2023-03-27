import { useMemo } from 'react';
import useSWR from 'swr';
import { Alert, VariableName } from '../types/Alert';

type CombinedAlert = {
  alerts: Alert[];
  affectedLines: string[];
  affectedStations: string[];
};

const TWO_HOUR_LOOKBACK_MS = 7200000;

const FALLBACK = {
  alerts: [],
  affectedLines: [],
  affectedStations: [],
};

export const useAlerts = (): CombinedAlert => {
  const { data, error } = useSWR<Alert[]>(
    '/api/alerts',
    (url: string) => fetch(url).then((resp) => resp.json()),
    { refreshInterval: 60000 }
  );

  const [memoData, memoLines, memoStations] = useMemo(() => {
    const filteredRecent =
      data?.filter?.(
        (alert) =>
          parseInt(alert.ModifiedDate, 10) >= Date.now() - TWO_HOUR_LOOKBACK_MS
      ) ?? [];

    const flattened =
      data?.flatMap((alert) => alert.incidentMessage.formVariableItems) ?? [];

    const lines = new Set(
      flattened
        .filter((vars) => vars.variableName === VariableName.Lines)
        .flatMap((vars) => vars.val)
        .map((lineStr) => lineStr.replace('-', '_'))
    );

    const stations = new Set(
      flattened
        .filter((vars) => vars.variableName === VariableName.Station)
        .flatMap((vars) => vars.val)
    );

    return [filteredRecent, lines, stations];
  }, [data]);

  if (error || !data) {
    return FALLBACK;
  }

  return {
    affectedLines: [...memoLines],
    affectedStations: [...memoStations],
    alerts: memoData,
  };
};
