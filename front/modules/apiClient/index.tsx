import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiClientProvider as Provider } from './context';
import { useApiClientValue } from './hooks';
import type { ReactElement } from 'react';

export * from './hooks';
export * from './hoc';

const queryClient = new QueryClient();
export function ApiClientProvider({ children }: { children: ReactElement }): JSX.Element {
  const apiClientValue = useApiClientValue();
  return (
    <Provider value={apiClientValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
