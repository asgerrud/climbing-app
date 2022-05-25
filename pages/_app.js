import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../components/Navbar.tsx'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Head>
          <title>🧗 Climbing app</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Box bg="#F2F2F2" minH="100vh">
          <Navbar />
          <Component {...pageProps}/>
        </Box>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp