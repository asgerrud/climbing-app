import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../components/Navbar.tsx'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>🧗 Climbing app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp