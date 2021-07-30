import { createPostOptions, fetchJSON } from '.';
import {
  MatchHighlightClient,
  PaginatedMatchHighlightsClient,
} from '../../../types';
import { getCurrentUser } from '../user';

export async function postHighlight(
  highlight: Omit<
    MatchHighlightClient,
    '_id' | 'createdAt' | 'username' | 'avatar'
  >
): Promise<MatchHighlightClient> {
  const { username, avatar } = (await getCurrentUser()) || {
    username: 'unknown',
    avatar: '',
  };
  const data = JSON.stringify({ ...highlight, username, avatar });
  const postOptions = createPostOptions(data);

  return fetchJSON<MatchHighlightClient>('/api/highlights', postOptions);
}

export async function getHighlights(query: {
  page: number;
  itemsPerPage: number;
  matchId?: string;
}): Promise<PaginatedMatchHighlightsClient> {
  const { page, itemsPerPage, ...rest } = query;
  const searchParams = new URLSearchParams({
    page: page.toString(),
    itemsPerPage: itemsPerPage.toString(),
    ...rest,
  });
  const queryString = searchParams.toString();

  const highlights = await fetchJSON<PaginatedMatchHighlightsClient>(
    `/api/highlights?${queryString}`
  );
  highlights.results = highlights.results.map((highlight) => ({
    ...highlight,
    createdAt: new Date(highlight.createdAt),
  }));
  return highlights;
}
