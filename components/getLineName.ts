const LINE_MAP: Record<string, string> = {
  'Journal Square via Hoboken': 'JS/HB',
  'Journal Square': 'JSQ',
  '33rd Street via Hoboken': '33/HB',
  '33rd Street': '33',
  Newark: 'NWK',
  Hoboken: 'HOB',
  'World Trade Center': 'WTC',
};

export const getShortLineName = (lineName: string): string => {
  return LINE_MAP[lineName] ?? lineName;
};
