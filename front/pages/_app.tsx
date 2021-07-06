import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from 'theme-ui';
import { cache } from '../lib/emotion';
import { light } from '../lib/theme';
import { ApiClientProvider } from '../modules/apiClient';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

function MyApp({ Component, pageProps }: Props): RenderReturnType {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={light}>
        <ApiClientProvider>
          <Component {...pageProps} />
        </ApiClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
