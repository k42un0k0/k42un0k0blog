import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';

export function useQueryWithSlug<S, E extends S, R>(
  slug: S,
  guard: (slug: S) => slug is E,
  apiClient: (val1: E) => {
    $get: (option?: any) => Promise<R>;
    $path: () => string;
  }
): UseQueryResult<R> {
  return useQuery(guard(slug) ? apiClient(slug).$path() : '', async () => {
    if (guard(slug)) return apiClient(slug).$get();
    return void 0;
  });
}
