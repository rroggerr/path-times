import { access, readFile, mkdir, writeFile } from 'fs/promises';

const CACHE_TTL = 15 * 1000; // 15 second TTL
const CACHE_DIR = '/tmp/stations';

type DataWithTs<T> = {
  data: T;
  ts: number;
};

export const readCache = async <T>(
  cacheKey: string,
  ttl = CACHE_TTL
): Promise<T> => {
  const file = await readFile(`${CACHE_DIR}/${cacheKey}`);
  const dataWithTs: DataWithTs<T> = JSON.parse(file.toString());

  const isStale = Date.now() - dataWithTs.ts > ttl;

  if (isStale) {
    console.log(`[Train Cache]: Stale cache for ${cacheKey}`);
    throw new Error('Cache stale');
  }
  console.log(`[Train Cache]: Read cache for ${cacheKey}`);
  return dataWithTs.data;
};

export const writeCache = async <T>(cacheKey: string, data: T) => {
  try {
    await access(CACHE_DIR);
  } catch {
    await mkdir(CACHE_DIR, { recursive: true });
  }

  const dataWithTs: DataWithTs<T> = { data, ts: Date.now() };

  const res = await writeFile(
    `${CACHE_DIR}/${cacheKey}`,
    JSON.stringify(dataWithTs)
  );
  console.log(`[Train Cache]: Wrote cache for ${cacheKey}`);
  return res;
};
