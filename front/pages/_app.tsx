import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from 'theme-ui';
import { light } from '../lib/constant/theme';
import { cache } from '../lib/emotion';
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
