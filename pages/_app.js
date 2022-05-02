import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../components/Navbar.tsx'

function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Head>
          <title>🧗 Climbing app</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp