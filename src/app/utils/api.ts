import {
  MatchClient,
  MatchHighlight,
  PaginatedMatchesClient,
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

export async function getMatches(): Promise<PaginatedMatchesClient> {
  const matches = await fetchJSON<PaginatedMatchesClient>('/api/matches');
  matches.results = matches.results.map((match) => ({
    ...match,
    createdAt: new Date(match.createdAt),
  }));
  return matches;
}

export async function postMatch(gameId: number): Promise<MatchClient | null> {
  const { username } = (await getCurrentUser()) || { username: 'unknown' };
  const data = JSON.stringify({ gameId, username });
  const postOptions = createPostOptions(data);

  try {
    return fetchJSON<MatchClient>('/api/matches', postOptions);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function postMatchHighlight(
  highlight: MatchHighlight,
  matchId: MatchClient['_id']
): Promise<MatchClient> | null {
  const data = JSON.stringify(highlight);
  const postOptions = createPostOptions(data);

  try {
    return fetchJSON<MatchClient>(
      `/api/matches/${matchId}/highlights`,
      postOptions
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getMatch(matchId: string): Promise<MatchClient> {
  return fetchJSON<MatchClient>(`/api/matches/${matchId}`);
}
