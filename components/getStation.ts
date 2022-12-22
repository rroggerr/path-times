import { Coordinates, StationInfo } from '../types/Station';
import { STATIONS } from '../utils/StationInfo';

export const getNearestStation = (coords: Coordinates): StationInfo => {
  const withDist = STATIONS.map((station) => ({
    station,
    dist: _getEuclid(coords, station.coordinates),
  }));

  withDist.sort((a, b) => a.dist - b.dist);
  return withDist[0].station;
};

const _getEuclid = (coordA: Coordinates, coordB: Coordinates) => {
  const a = coordA.latitude - coordB.latitude;
  const b = coordA.longitude - coordB.longitude;
  return Math.sqrt(a * a + b * b);
};
