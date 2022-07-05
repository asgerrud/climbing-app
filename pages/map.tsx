import { Box, Button, Center, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import prisma from '../utils/prisma'
import { Location as cLocation } from '@prisma/client'
import { useSession } from 'next-auth/react'

interface MapProps {
  locations: cLocation[]
}


const MapPage: React.FunctionComponent<MapProps> = ({ locations }) => {

  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Map = useMemo(() => dynamic(() => import('../components/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    }
  ), [])

  const onAddLocation = (latLng) => {
    console.log(latLng)
    onOpen()
  }

  return (
    <Box>
      <Map darkMode={colorMode === 'dark'} locations={locations} onAddLocation={onAddLocation}/>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Image' />
            <Input placeholder='Name' />
            <Input placeholder='Description' />
            <Input placeholder='Climbing types' />
            <Input placeholder='Grades' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='orange' mr={3}>
              Save
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
