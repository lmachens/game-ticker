import { createPostOptions, fetchJSON } from '.';
import { MatchClient, PaginatedMatchesClient } from '../../../types';
import { getCurrentUser } from '../user';

export async function getMatches(query: {
  page: number;
  itemsPerPage: number;
}): Promise<PaginatedMatchesClient> {
  const { page, itemsPerPage, ...rest } = query;
  const searchParams = new URLSearchParams({
    page: page.toString(),
    itemsPerPage: itemsPerPage.toString(),
    ...rest,
  });
  const queryString = searchParams.toString();

  const matches = await fetchJSON<PaginatedMatchesClient>(
    `/api/matches?page=${queryString}`
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

export function getMatch(matchId: string): Promise<MatchClient> {
  return fetchJSON<MatchClient>(`/api/matches/${matchId}`);
}
