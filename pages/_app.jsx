import Head from 'next/head'
import { GlobalStyle } from '../components/styled/global'
import { background } from '../components/styled/colors'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={background} />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="180x180"
          href="/favicon-180.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96.png"
          sizes="96x96"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
