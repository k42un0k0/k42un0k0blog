import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiClientProvider, useDefaultApiClientValue } from '../lib/apiClient';

type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const apiClientValue = useDefaultApiClientValue();
  return (
    <ApiClientProvider value={apiClientValue}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ApiClientProvider>
  );
}

export default MyApp;
