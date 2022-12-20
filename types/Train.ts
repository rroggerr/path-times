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

export enum Station {
  NEWARK = "newark",
  HARRISON = "harrison",
  JOURNAL_SQUARE = "journal_square",
  GROVE_STREET = "grove_street",
  EXCHANGE_PLACE = "exchange_place",
  WORLD_TRADE_CENTER = "world_trade_center",
  NEWPORT = "newport",
  HOBOKEN = "hoboken",
  CHRISTOPHER_STREET = "christopher_street",
  NINTH_STREET = "ninth_street",
  FOURTEENTH_STREET = "fourteenth_street",
  TWENTY_THIRD_STREET = "twenty_third_street",
  THIRTY_THIRD_STREET = "thirty_third_street",
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

export type MappedTrain = Omit<Train, "projectedArrival" | "lastUpdated"> & {
  projectedArrival: Date;
  lastUpdated: Date;
};
