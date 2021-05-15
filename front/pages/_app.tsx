import '../styles/globals.css';

type Props = {
  Component: React.VFC;
  pageProps: Record<string, unknown>;
};

function MyApp({ Component, pageProps }: Props): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
