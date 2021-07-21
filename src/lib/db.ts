import { MongoClient } from 'mongodb';

export async function connectToMongoDb(uri: string): Promise<void> {
  const client = new MongoClient(uri);
  await client.connect();

  await client.db().command({ ping: 1 });
}
