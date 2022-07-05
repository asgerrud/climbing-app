import Hero from '../components/Hero'
import { Box, useColorMode } from '@chakra-ui/react'

const Home: React.FC = () => {
  
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Hero />
    </Box>
  )
}

export default Home