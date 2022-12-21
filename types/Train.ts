export enum Direction {
  ALL = "",
  TO_NY = "TO_NY",
  TO_NJ = "TO_NJ",
}

export enum Status {
  ON_TIME = "ON_TIME",
  DELAY = "DELAY",
  ARRIVING_NOW = "ARRIVING_NOW",
}

export interface Train {
  lineName: string;
  headsign: string;
  route: string;
  routeDisplayName: string;
  direction: Direction;
  lineColors: string[];
  status: Status;
  projectedArrival: string;
  lastUpdated: string;
}
