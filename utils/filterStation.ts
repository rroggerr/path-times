import { STATIONS } from './StationInfo';

export const isValidStation = (stationName: string | null): boolean => {
  if (!stationName) {
    return false;
  }

  return STATIONS.some(
    ({ station }) => station.toLowerCase() === stationName.toLowerCase()
  );
};
