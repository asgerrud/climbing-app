import { Box, Button, Link, useColorMode } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import prisma from '../utils/prisma'
import { Location as cLocation } from '@prisma/client'
import { AddIcon } from '@chakra-ui/icons'

interface MapProps {
  locations: cLocation[]
}

const MapPage: React.FunctionComponent<MapProps> = ({ locations }) => {

  const { colorMode } = useColorMode()

  const Map = useMemo(() => dynamic(() => import('../components/generic/map/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    }
  ), [])

  return (
    <Box>
      <Map darkMode={colorMode === 'dark'} locations={locations} />
      <Box position="absolute" right={4} bottom={4} zIndex={1}>
        <Link href="/location/add">
          <Button colorScheme="orange" borderRadius="100%" w={42} h={42} fontSize={20}>
            <AddIcon w={4} />
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const locations = await prisma.location.findMany({
    include: {
      type: {
        select: { name: true }
      },
      facilities: {
        select: { name: true }
      }
    }
  })
  return { 
    props: { 
      locations: JSON.parse(JSON.stringify(locations))  
    }
  }
}

export default MapPage
