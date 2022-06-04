import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import { Box, Button, Center } from '@chakra-ui/react'
import prisma from '../lib/prisma'

type HomeProps = {
  locations: Location[]
}

export const getStaticProps: GetStaticProps = async () => {
  const locations = await prisma.location.findMany({
    include: {
      categories: {
        select: {
          name: true,
          iconUrl: true
        }
      }
    }
  })
  return { 
    props: { 
      locations: JSON.parse(JSON.stringify(locations))  
    }
  }
}

const Home: React.FC<HomeProps> = ({ locations }) => {
  
  const [darkMode, setDarkMode] = useState(true)

  const Map = useMemo(() => dynamic(() => import('../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  ), [darkMode])

  return (
    <Box>
      <Map darkMode={darkMode} locations={locations}/>
      <Center p={4} mx="auto">
        <Button onClick={() => setDarkMode(!darkMode)}>
          <span>{darkMode ? '🌞' : '🌑'}</span>
        </Button>
      </Center>
      <Hero />
    </Box>
  )
}

export default Home