import '../styles/globals.css';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { ApiClientProvider, useApiClientValue } from '../lib/apiClient';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const apiClientValue = useApiClientValue();
  return (
    <ThemeProvider theme={{}}>
      <SnackbarProvider maxSnack={3}>
        <ApiClientProvider value={apiClientValue}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ApiClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
