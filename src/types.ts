// Types shared by client and server
import type { ObjectId } from 'mongodb';

export type MatchHighlight = {
  _id: ObjectId;
  matchId: ObjectId;
  timestamp: number;
  events: string[];
  videoSrc: string;
  createdAt: Date;
};

export type MatchHighlightClient = {
  _id: string;
  matchId: string;
} & Omit<MatchHighlight, '_id' | 'matchId'>;

export type PaginatedMatchHighlightsClient = Pagination<MatchHighlightClient>;
export type PaginatedMatchHighlights = Pagination<MatchHighlight>;

export type Match = {
  _id: ObjectId;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: { highlightId: ObjectId }[];
};

export type MatchClient = {
  _id: string;
  highlights: { highlightId: string }[];
} & Omit<Match, '_id' | 'highlights'>;

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

export type Profile = {
  username: string | null;
  displayName: string | null;
  avatar: string | null;
};
