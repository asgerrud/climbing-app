import { Box, Button, Center, Container, Flex, Heading, HStack, Input, Link, Select, Stack, Text, useColorMode, VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
import { Facility, Location as cLocation, Type } from '@prisma/client'
import prisma from '../../utils/prisma'
import SelectList from '../../components/generic/select-list/SelectList'

interface AddPageProps {
  locations: cLocation[]
  facilities: Facility[]
  types: Type[]
}

const AddPage: React.FC<AddPageProps> = ({ locations, facilities, types }: AddPageProps) => {

  const facilityNames = facilities.map(f => f.name).sort()
  const typeNames = types.map(t => t.name).sort()
  
  const { colorMode } = useColorMode()

  const [name, setName] = useState('')
  const [typeSelected, setTypeSelected] = useState<type>('')
  const [optionsSelected, setOptionsSelected] = useState<facility[]>([])
  const [latLng, setLatLng] = useState(null)

  const fieldsFilled = () => {
    const hasOptions = optionsSelected.length > 0
    console.log(typeSelected)
    return !!name && !!typeSelected && hasOptions && !!latLng
  }

  const Map = useMemo(() => dynamic(() => import('../../components/generic/map/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    }
  ), [])

  const submitLocation = () => {
    // TODO: add form validation
    console.log('Pow')
  }

  const onPlaceMarker = (latLng) => {
    setLatLng(latLng)
    console.log(latLng)
  }

  return (
    <Container>
      <Heading as="h1" size="lg" mb={4}>Add location</Heading>
      <Stack spacing={4} mb={10}>
        <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        <Select onChange={e => setTypeSelected(e.target.value)}>
          <option value="">Select option</option>
          {typeNames.map(type => <option key={type} value={type}>{type}</option>)}
        </Select>
        <SelectList label="facility" options={facilityNames} onOptionsChanged={(options) => setOptionsSelected(options)}/>
        <Text fontSize="xl">Select location</Text>
        <Flex flexDirection="column" alignItems="flex-end">
          <Map height="30vh" darkMode={colorMode === 'dark'} locations={locations} onPlaceMarker={onPlaceMarker}/>
          <Text as="small" color="whiteAlpha.400">{latLng?.lat.toFixed(7) || '0'}, {latLng?.lng.toFixed(7) || '0'}</Text>
        </Flex>
      </Stack>
      <Center>
        <VStack>
          <Button onClick={submitLocation} colorScheme="orange" disabled={fieldsFilled() == false}>Add location</Button>
          <Link href="/map" _hover={{ textDecoration: 'none' }}>Back to map</Link>
        </VStack>
      </Center>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const facilities = await prisma.facility.findMany({ select: { name: true }})
  const types      = await prisma.type.findMany({ select: { name: true }})
  const locations  = await prisma.location.findMany({
    include: {
      facilities: {
        select: {
          name: true,
          iconUrl: true
        }
      }
    }
  })

  return { 
    props: { 
      locations: JSON.parse(JSON.stringify(locations)),
      facilities: JSON.parse(JSON.stringify(facilities)),
      types: JSON.parse(JSON.stringify(types))
    }
  }
}

export default AddPage