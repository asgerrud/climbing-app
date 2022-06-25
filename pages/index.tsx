import { useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import { Box, Button, Center, useColorMode } from '@chakra-ui/react'
import prisma from '../utils/prisma'
import { Location as cLocation } from '@prisma/client'

type HomeProps = {
  locations: cLocation[]
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
  
  const { colorMode, toggleColorMode } = useColorMode()

  const Map = useMemo(() => dynamic(() => import('../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  ), [colorMode])

  return (
    <Box>
      <Map darkMode={colorMode === 'dark'} locations={locations}/>
      <Center p={4} mx="auto">
        <Button onClick={toggleColorMode}>
          <span>{colorMode === 'light' ? '🌞' : '🌑'}</span>
        </Button>
      </Center>
      <Hero />
    </Box>
  )
}

export default Home