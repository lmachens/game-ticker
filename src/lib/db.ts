import { Collection, Db, MongoClient } from 'mongodb';

let db: Db | null = null;
export async function connectToMongoDb(uri: string): Promise<void> {
  const client = new MongoClient(uri);
  await client.connect();
  db = await client.db();

  await db.command({ ping: 1 });
}

export function getDb(): Db {
  if (db === null) {
    throw new Error(
      'Database connection not established. Call connectToMongoDb first.'
    );
  }
  return db;
}

export function getCollection<DocType>(name: string): Collection<DocType> {
  return getDb().collection<DocType>(name);
}
