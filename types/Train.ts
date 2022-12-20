export enum Route {
  NWK_WTC = "NWK_WTC",
}

export enum Direction {
  TO_NY = "TO_NY",
  TO_NJ = "TO_NJ",
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
  // CHRISTOPHER_STREET = "christopher_street",
  // ninth_street
  // fourteenth_street
  // twenty_third_street
  // thirty_third_street
}

export interface Train {
  lineName: string;
  headsign: string;
  route: Route;
  routeDisplayName: string;
  direction: Direction;
  lineColors: string[];
  status: string;
  projectedArrival: string;
  lastUpdated: string;
}

export type MappedTrain = Omit<Train, "projectedArrival"> & {
  projectedArrival: Date;
};
