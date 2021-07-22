import { Collection, ObjectId } from 'mongodb';
import { getCollection } from './db';

export type Match = {
  _id?: ObjectId;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: Highlight[];
};

export type Highlight = {
  timestamp: number;
  type: string;
  videoSrc: string;
};

export function getMatchesCollection(): Collection<Match> {
  return getCollection<Match>('matches');
}
