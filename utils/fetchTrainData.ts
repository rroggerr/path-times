import { Schedule } from '../types/Api';

export const fetchTrainData = async (station: string): Promise<Schedule> => {
  const url = `https://path.api.razza.dev/v1/stations/${station}/realtime`;
  const resp = await fetch(url);
  console.log(await resp.text());
  const json: Schedule = await resp.json();
  return json;
};
