import { Schedule } from '../types/Api';

export const fetchTrainData = async (station: string): Promise<Schedule> => {
  const url = `https://path.api.razza.dev/v1/stations/${station}/realtime`;
  const resp: Schedule = await (await fetch(url)).json();
  return resp;
};
