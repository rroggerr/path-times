import { access, readFile, mkdir, writeFile } from 'fs/promises';

const CACHE_TTL = 15 * 1000; // 15 second TTL
const CACHE_DIR = '/tmp/stations';

type DataWithTs<T> = {
  data: T;
  ts: number;
};

export const readCache = async <T>(stationName: string): Promise<T> => {
  const file = await readFile(`${CACHE_DIR}/${stationName}`);
  const dataWithTs: DataWithTs<T> = JSON.parse(file.toString());

  const isStale = Date.now() - dataWithTs.ts > CACHE_TTL;

  if (isStale) {
    console.log(`[Train Cache]: Stale cache for ${stationName}`);
    throw new Error('Cache stale');
  }
  console.log(`[Train Cache]: Read cache for ${stationName}`);
  return dataWithTs.data;
};

export const writeCache = async <T>(stationName: string, data: T) => {
  try {
    await access(CACHE_DIR);
  } catch {
    await mkdir(CACHE_DIR, { recursive: true });
  }

  const dataWithTs: DataWithTs<T> = { data, ts: Date.now() };

  const res = await writeFile(
    `${CACHE_DIR}/${stationName}`,
    JSON.stringify(dataWithTs)
  );
  console.log(`[Train Cache]: Wrote cache for ${stationName}`);
  return res;
};
