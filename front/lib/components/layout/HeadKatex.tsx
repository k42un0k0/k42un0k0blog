import { useAmp } from 'next/amp';
import Head from 'next/head';
export default function HeadKatex(): JSX.Element {
  const isAmp = useAmp();
  return (
    <Head>
      {isAmp ? (
        <script async custom-element="amp-mathml" src="https://cdn.ampproject.org/v0/amp-mathml-0.1.js"></script>
      ) : (
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      )}
    </Head>
  );
}
