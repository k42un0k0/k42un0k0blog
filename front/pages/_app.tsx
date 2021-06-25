import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { light } from '../lib/constant/theme';
import { ApiClientProvider, useApiClientValue } from '../lib/context/apiClient';
import { cache } from '../lib/emotion';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const apiClientValue = useApiClientValue();
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={light}>
        <SnackbarProvider maxSnack={3}>
          <ApiClientProvider value={apiClientValue}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ApiClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
