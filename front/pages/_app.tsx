import '../styles/globals.css'

type Props = { Component: React.FC, pageProps: {} }
function MyApp({ Component, pageProps }: Props) {
  return <Component { ...pageProps } />
}

export default MyApp
