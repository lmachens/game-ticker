import { Collection, Document, ObjectId } from 'mongodb';
import { getCollection, getDb } from './db';

export type MatchHighlight = {
  timestamp: number;
  type: string;
  videoSrc: string;
};

export type Match = {
  _id?: ObjectId;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: MatchHighlight[];
};

export function getMatchesCollection(): Collection<Match> {
  return getCollection<Match>('matches');
}

export function ensureMatchesIndexes(): Promise<string[]> {
  return getMatchesCollection().createIndexes([
    { key: { createdAt: -1 } },
    { key: { username: 1 } },
    { key: { gameId: 1 } },
    { key: { gameId: 1, username: 1 } },
  ]);
}

export function ensureMatchesSchema(): Promise<Document> {
  return getDb().command({
    collMod: 'matches',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Match',
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          gameId: {
            bsonType: 'int',
          },
          username: {
            bsonType: 'string',
          },
          createdAt: {
            bsonType: 'date',
          },
          highlights: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                timestamp: {
                  bsonType: 'int',
                },
                type: {
                  bsonType: 'string',
                },
                videoSrc: {
                  bsonType: 'string',
                },
              },
            },
          },
        },
        additionalProperties: false,
        required: ['gameId', 'username', 'createdAt', 'highlights'],
      },
    },
  });
}
