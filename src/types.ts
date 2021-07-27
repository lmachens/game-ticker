// Types shared by client and server
import type { ObjectId } from 'mongodb';

export type MatchHighlight = {
  timestamp: number;
  events: string[];
  videoSrc: string;
};

export type Match = {
  _id?: ObjectId;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: MatchHighlight[];
};
