import { Match, MatchHighlight, PaginatedMatchesClient } from '../../types';
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

export async function getMatches(): Promise<PaginatedMatchesClient> {
  const matches = await fetchJSON<PaginatedMatchesClient>('/api/matches');
  matches.results = matches.results.map((match) => ({
    ...match,
    createdAt: new Date(match.createdAt),
  }));
  return matches;
}

export async function postMatch(gameId: number): Promise<Match | null> {
  const { username } = (await getCurrentUser()) || { username: 'unknown' };
  const data = JSON.stringify({ gameId, username });

  try {
    return fetchJSON<Match>('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function postMatchHighlight(
  highlight: MatchHighlight,
  matchId: Match['_id']
): Promise<Match> | null {
  const data = JSON.stringify(highlight);

  try {
    return fetchJSON<Match>(`/api/matches/${matchId}/highlights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
