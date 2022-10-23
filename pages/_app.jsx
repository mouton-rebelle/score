import Head from 'next/head'
import { GlobalStyle } from '../components/styled/global'
import { background } from '../components/styled/colors'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={background} />
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
