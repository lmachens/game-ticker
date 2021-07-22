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
