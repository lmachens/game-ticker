import { Match, MatchHighlight, PaginatedMatches } from '../../types';

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

export function getMatches(): Promise<PaginatedMatches> {
  return fetchJSON<PaginatedMatches>('/api/matches');
}

export function postMatch(gameId: number): Promise<Match> | null {
  const username = 'peter123';
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
