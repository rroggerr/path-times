import { Coordinates, Station, StationInfo } from '../types/Station';

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

const STATIONS: StationInfo[] = [
  {
    station: Station.NEWARK,
    id: '26733',
    name: 'Newark',
    coordinates: {
      latitude: 40.73454,
      longitude: -74.16375,
    },
  },
  {
    station: Station.HARRISON,
    id: '26729',
    name: 'Harrison',
    coordinates: {
      latitude: 40.73942,
      longitude: -74.15587,
    },
  },
  {
    station: Station.JOURNAL_SQUARE,
    id: '26731',
    name: 'Journal Square',
    coordinates: {
      latitude: 40.73301,
      longitude: -74.06289,
    },
  },
  {
    station: Station.GROVE_STREET,
    id: '26728',
    name: 'Grove Street',
    coordinates: {
      latitude: 40.71966,
      longitude: -74.04245,
    },
  },
  {
    station: Station.EXCHANGE_PLACE,
    id: '26727',
    name: 'Exchange Place',
    coordinates: {
      latitude: 40.71676,
      longitude: -74.03238,
    },
  },
  {
    station: Station.WORLD_TRADE_CENTER,
    id: '26734',
    name: 'World Trade Center',
    coordinates: {
      latitude: 40.71271,
      longitude: -74.01193,
    },
  },
  {
    station: Station.NEWPORT,
    id: '26732',
    name: 'Newport',
    coordinates: {
      latitude: 40.72699,
      longitude: -74.03383,
    },
  },
  {
    station: Station.HOBOKEN,
    id: '26730',
    name: 'Hoboken',
    coordinates: {
      latitude: 40.73586,
      longitude: -74.02922,
    },
  },
  {
    station: Station.CHRISTOPHER_STREET,
    id: '26726',
    name: 'Christopher Street',
    coordinates: {
      latitude: 40.73295,
      longitude: -74.00707,
    },
  },
  {
    station: Station.NINTH_STREET,
    id: '26725',
    name: '9th Street',
    coordinates: {
      latitude: 40.73424,
      longitude: -73.9991,
    },
  },
  {
    station: Station.FOURTEENTH_STREET,
    id: '26722',
    name: '14th Street',
    coordinates: {
      latitude: 40.73735,
      longitude: -73.99684,
    },
  },
  {
    station: Station.TWENTY_THIRD_STREET,
    id: '26723',
    name: '23rd Street',
    coordinates: {
      latitude: 40.7429,
      longitude: -73.99278,
    },
  },
  {
    station: Station.THIRTY_THIRD_STREET,
    id: '26724',
    name: '33rd Street',
    coordinates: {
      latitude: 40.74912,
      longitude: -73.98827,
    },
  },
];
