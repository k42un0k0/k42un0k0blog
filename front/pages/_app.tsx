import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
