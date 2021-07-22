import { Collection, ObjectId } from 'mongodb';
import { getCollection } from './db';

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
