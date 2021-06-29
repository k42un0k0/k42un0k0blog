import dynamic from 'next/dynamic';
import { QueryClient } from 'react-query';
import { ApiClientProvider, useApiClientValue } from '../context/apiClient';
import type { QueryClientProviderProps } from 'react-query';

const QueryClientProvider = dynamic<QueryClientProviderProps>(async () =>
  import('react-query').then((mod) => mod.QueryClientProvider)
);
const queryClient = new QueryClient();

export function withApiProvider(Component: React.VFC): React.VFC {
  return function WithApiProvider(): JSX.Element {
    const apiClientValue = useApiClientValue();
    return (
      <ApiClientProvider value={apiClientValue}>
        <QueryClientProvider client={queryClient}>
          <Component />
        </QueryClientProvider>
      </ApiClientProvider>
    );
  };
}
