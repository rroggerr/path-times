export type Coordinates = {
  latitude: number;
  longitude: number;
};

export enum Station {
  NEWARK = 'newark',
  HARRISON = 'harrison',
  JOURNAL_SQUARE = 'journal_square',
  GROVE_STREET = 'grove_street',
  EXCHANGE_PLACE = 'exchange_place',
  WORLD_TRADE_CENTER = 'world_trade_center',
  NEWPORT = 'newport',
  HOBOKEN = 'hoboken',
  CHRISTOPHER_STREET = 'christopher_street',
  NINTH_STREET = 'ninth_street',
  FOURTEENTH_STREET = 'fourteenth_street',
  TWENTY_THIRD_STREET = 'twenty_third_street',
  THIRTY_THIRD_STREET = 'thirty_third_street',
}

export type StationInfo = {
  station: Station;
  id: string;
  name: string;
  coordinates: Coordinates;
  isDisabled?: boolean;
};
