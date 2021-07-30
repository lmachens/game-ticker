import { createPostOptions, fetchJSON } from '.';
import {
  MatchHighlightClient,
  PaginatedMatchHighlightsClient,
} from '../../../types';

export async function postHighlight(
  highlight: Omit<MatchHighlightClient, '_id' | 'createdAt'>
): Promise<MatchHighlightClient> {
  const data = JSON.stringify(highlight);
  const postOptions = createPostOptions(data);

  return fetchJSON<MatchHighlightClient>('/api/highlights', postOptions);
}

export async function getHighlights(query: {
  page: number;
  itemsPerPage: number;
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
