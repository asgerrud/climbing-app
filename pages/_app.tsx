import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, Box, extendTheme, type ThemeConfig, ColorModeScript } from '@chakra-ui/react'
import Head from 'next/head'
import Navbar from '../components/Navbar'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const App: React.FC<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>🧗 Climbing app</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Box minH="100vh">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Navbar />
          <Component {...pageProps}/>
        </Box>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App