import { access, readFile, mkdir, writeFile } from 'fs/promises';
import { Schedule } from '../types/Api';

const CACHE_TTL = 15 * 1000; // 15 second TTL
const CACHE_DIR = '/tmp/stations';

type ScheduleWithTs = {
  data: Schedule;
  ts: number;
};

export const readCache = async (stationName: string): Promise<Schedule> => {
  const file = await readFile(`${CACHE_DIR}/${stationName}`);
  const dataWithTs: ScheduleWithTs = JSON.parse(file.toString());

  const isStale = Date.now() - dataWithTs.ts > CACHE_TTL;

  if (isStale) {
    console.log(`[Train Cache]: Stale cache for ${stationName}`);
    throw new Error('Cache stale');
  }
  console.log(`[Train Cache]: Read cache for ${stationName}`);
  return dataWithTs.data;
};

export const writeCache = async (stationName: string, data: Schedule) => {
  try {
    await access(CACHE_DIR);
  } catch {
    await mkdir(CACHE_DIR, { recursive: true });
  }

  const dataWithTs: ScheduleWithTs = { data, ts: Date.now() };

  const res = await writeFile(
    `${CACHE_DIR}/${stationName}`,
    JSON.stringify(dataWithTs)
  );
  console.log(`[Train Cache]: Wrote cache for ${stationName}`);
  return res;
};
