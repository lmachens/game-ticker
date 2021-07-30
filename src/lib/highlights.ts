import { Collection, Document, Filter, ObjectId } from 'mongodb';
import { getCollection, getDb } from './db';
import { ParsedQs } from 'qs';
import { MatchHighlight } from '../types';

export function getHighlightsCollection(): Collection<MatchHighlight> {
  return getCollection<MatchHighlight>('highlights');
}

export function ensureHighlightsIndexes(): Promise<string[]> {
  return getHighlightsCollection().createIndexes([
    { key: { createdAt: -1 } },
    { key: { matchId: 1 } },
  ]);
}

export function ensureHighlightsSchema(): Promise<Document> {
  return getDb().command({
    collMod: 'highlights',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Highlight',
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          matchId: {
            bsonType: 'objectId',
          },
          timestamp: {
            bsonType: 'int',
          },
          events: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
          videoSrc: {
            bsonType: 'string',
          },
          createdAt: {
            bsonType: 'date',
          },
        },
        additionalProperties: false,
        required: ['matchId', 'timestamp', 'events', 'videoSrc'],
      },
    },
  });
}

export function createHighlightsQuery(
  requestQuery: ParsedQs
): Filter<MatchHighlight> {
  const query: Filter<MatchHighlight> = {};
  const matchId = requestQuery.matchId;

  if (typeof matchId === 'string') {
    query.matchId = new ObjectId(matchId);
  }
  return query;
}
