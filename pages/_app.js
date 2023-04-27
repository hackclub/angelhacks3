import '@/styles/globals.scss'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          defer
          data-domain="angelhacks.org"
          src="https://plausible.io/js/script.js"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
