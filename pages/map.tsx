import { Box, Button, Center, useColorMode } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import prisma from '../utils/prisma'
import { Location as cLocation } from '@prisma/client'

interface MapProps {
  locations: cLocation[]
}


const MapPage: React.FunctionComponent<MapProps> = ({ locations }) => {

  const { colorMode, toggleColorMode } = useColorMode()

  const Map = useMemo(() => dynamic(() => import('../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    }
  ), [colorMode])

  return (
    <Box>
      <Map darkMode={colorMode === 'dark'} locations={locations}/>
      <Center p={4} mx="auto">
        <Button onClick={toggleColorMode}>
          <span>{colorMode === 'light' ? '🌞' : '🌑'}</span>
        </Button>
      </Center>
    </Box>
  );
};

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

export default MapPage;
