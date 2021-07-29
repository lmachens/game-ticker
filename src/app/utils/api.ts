import {
  MatchClient,
  MatchHighlight,
  PaginatedMatchesClient,
  QueryOptions,
} from '../../types';
import { getCurrentUser } from './user';

const { VITE_API_ENDPOINT } = import.meta.env;

if (!VITE_API_ENDPOINT) {
  throw new Error('VITE_API_ENDPOINT is not set');
}

export function fetchJSON<T>(
  url: RequestInfo,
  init?: RequestInit | undefined
): Promise<T> {
  return fetch(`${VITE_API_ENDPOINT}${url}`, init).then((response) =>
    response.json()
  );
}

function createPostOptions(data: BodyInit): RequestInit {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  };

  return postOptions;
}

export async function getMatches(
  query: QueryOptions
): Promise<PaginatedMatchesClient> {
  const { page, itemsPerPage, ...rest } = query;
  const searchParams = new URLSearchParams({
    page: page.toString(),
    itemsPerPage: itemsPerPage.toString(),
    ...rest,
  });
  const queryString = searchParams.toString();

  const matches = await fetchJSON<PaginatedMatchesClient>(
    `/api/matches?${queryString}`
  );
  matches.results = matches.results.map((match) => ({
    ...match,
    createdAt: new Date(match.createdAt),
  }));
  return matches;
}

export async function postMatch(gameId: number): Promise<MatchClient> {
  const { username } = (await getCurrentUser()) || { username: 'unknown' };
  const data = JSON.stringify({ gameId, username });
  const postOptions = createPostOptions(data);

  return fetchJSON<MatchClient>('/api/matches', postOptions);
}

export function postMatchHighlight(
  highlight: MatchHighlight,
  matchId: MatchClient['_id']
): Promise<MatchClient> {
  const data = JSON.stringify(highlight);
  const postOptions = createPostOptions(data);

  return fetchJSON<MatchClient>(
    `/api/matches/${matchId}/highlights`,
    postOptions
  );
}

export function getMatch(matchId: string): Promise<MatchClient> {
  return fetchJSON<MatchClient>(`/api/matches/${matchId}`);
}
