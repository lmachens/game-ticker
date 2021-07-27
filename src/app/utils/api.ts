import { PaginatedMatches } from '../../types';

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
