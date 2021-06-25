/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { light } from '../lib/constant/theme';
import { ApiClientProvider, useApiClientValue } from '../lib/context/apiClient';
import { cache } from '../lib/emotion';
// @ts-expect-error aaa
// eslint-disable-next-line import/no-unresolved
import draculaCss from '!!raw-loader!../styles/dracula.css';
// @ts-expect-error aaa
// eslint-disable-next-line import/no-unresolved
import css from '!!raw-loader!../styles/globals.css';
// @ts-expect-error aaa
// eslint-disable-next-line import/no-unresolved
import easymde from '!!raw-loader!easymde/dist/easymde.min.css';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const apiClientValue = useApiClientValue();
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `${css}${draculaCss}${easymde}` }} />
      </Head>
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
    </>
  );
}

export default MyApp;
