export const getLineName = (name: string, isNarrow: boolean) => {
  if (!isNarrow) {
    return name;
  }

  if (name === 'World Trade Center') {
    return 'WTC';
  }
  return name;
};
