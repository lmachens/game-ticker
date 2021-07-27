// Types shared by client and server
import type { ObjectId } from 'mongodb';

export type MatchHighlight = {
  timestamp: number;
  events: string[];
  videoSrc: string;
};

export type Match = {
  _id: ObjectId;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: MatchHighlight[];
};

export type MatchClient = {
  _id: string;
} & Omit<Match, '_id'>;

export type Pagination<T> = {
  info: {
    total: number;
    itemsPerPage: number;
    page: number;
  };
  results: T[];
};

export type PaginatedMatchesClient = Pagination<MatchClient>;
export type PaginatedMatches = Pagination<Match>;
