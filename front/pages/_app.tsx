import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from 'theme-ui';
import { cache } from '../lib/emotion';
import { light } from '../lib/theme';
type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

function MyApp({ Component, pageProps }: Props): JSX.Element {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={light}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
