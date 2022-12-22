import { STATIONS } from './StationInfo';

export const isValidStation = (stationName: string): boolean => {
  return STATIONS.some(
    ({ station }) => station.toLowerCase() === stationName.toLowerCase()
  );
};
