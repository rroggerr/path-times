import { Schedule } from '../types/Api';
import { fetchTrainData } from '../utils/fetchTrainData';
import { getDbConnection } from './client';

enum STATUS {
  DONE = 'DONE',
  LOADING = 'LOADING',
}

const STATION_COLLECTION_NAME = 'pathstation';
const THIRTY_SECOND_TTL = 30 * 1000;

export const readStation = async (
  station: string
): Promise<Schedule | undefined> => {
  const db = await getDbConnection();
  const collection = db.collection(STATION_COLLECTION_NAME);
  const res = await collection.findOne({ station });
  const content = res?.content;

  /** Case valid cache or loading */
  if (res?.updateAt < Date.now() - THIRTY_SECOND_TTL) {
    return content;
  }

  await collection.updateOne(
    { station },
    {
      $set: { updatedAt: Date.now(), status: STATUS.LOADING },
    },
    { upsert: true }
  );
  /** Fetch new items */
  const newContent = await fetchTrainData(station);
  await collection.updateOne(
    { station },
    {
      $set: {
        content: newContent,
        updatedAt: Date.now(),
        status: STATUS.DONE,
      },
    },
    { upsert: true }
  );
  return newContent;
};
