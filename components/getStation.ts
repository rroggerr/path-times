import { Coordinates, StationInfo } from '../types/Station';
import { STATIONS } from '../utils/StationInfo';

export const getNearestStation = (coords: Coordinates): StationInfo => {
  const withDist = STATIONS.map((station) => ({
    station,
    dist: _getEuclid(coords, station.coordinates),
  }));

  const minDist = withDist.reduce(
    (acc, curr) => (curr.dist < acc.dist ? curr : acc),
    withDist[0]
  );
  return minDist.station;
};

const _getEuclid = (coordA: Coordinates, coordB: Coordinates) => {
  const a = coordA.latitude - coordB.latitude;
  const b = coordA.longitude - coordB.longitude;
  return Math.sqrt(a * a + b * b);
};
