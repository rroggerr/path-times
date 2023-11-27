import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';

let db: Db | null = null;

export const getDbConnection = async () => {
  if (!db) {
    const client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });
    await client.connect();
    db = client.db();
  }
  return db;
};
