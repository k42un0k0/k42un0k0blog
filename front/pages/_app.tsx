import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ApiClientProvider, useApiClientValue } from '../lib/apiClient';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const apiClientValue = useApiClientValue();
  return (
    <SnackbarProvider maxSnack={3}>
      <ApiClientProvider value={apiClientValue}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApiClientProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
