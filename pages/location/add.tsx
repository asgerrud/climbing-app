import { Button, Center, Container, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Select, Stack, Text, useColorMode, VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
import { Facility, Location as cLocation, Type } from '@prisma/client'
import prisma from '../../utils/prisma'
import SelectList from '../../components/generic/select-list/SelectList'
import MissingAuthentication from '../../components/generic/screens/MissingAuthentication'
import { useSession } from 'next-auth/react'
import Loading from '../../components/generic/loading/Loading'
import Router from 'next/router'

interface AddPageProps {
  locations: cLocation[]
  facilities: Facility[]
  types: Type[]
}

const AddPage: React.FC<AddPageProps> = ({ locations }: AddPageProps) => {

  const facilities = ['Bouldering', 'Top rope', 'Lead', 'Trad climbing']
  const types = ['Indoor', 'Outdoor', 'Mixed']

  const { data: session, status } = useSession()
  const { colorMode } = useColorMode()

  const [name, setName] = useState('')
  const [type, setType] = useState<type>('')
  const [facilitiesSelected, setFacilitiesSelected] = useState<facility[]>([])
  const [latLng, setLatLng] = useState<latLng>(null)

  /* Form validation */
  const hasName = name != ''
  const hasType = type != ''
  const hasFacilities = facilitiesSelected.length > 0
  const hasCoords = latLng != null

   const formFilled = () => hasName && hasType && hasFacilities && hasCoords

  const submitLocation = async (e: React.SyntheticEvent) => {
    try {
      const body = { 
        name: name,
        lat: latLng.lat,
        lon: latLng.lng,
        type: type,
        facilities: facilitiesSelected,
      }
      await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      

      await Router.push('/map')
    } catch (error) {
    
    };
    Router.reload()
  }

  const Map = useMemo(() => dynamic(() => import('../../components/generic/map/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>Loading...</p>,
      ssr: false 
    }
  ), [])

  const onPlaceMarker = (latLng) => {
    setLatLng(latLng)
  }

  if (status === 'loading') {
    return <Loading />
  }
  if (!session && status != 'authenticated') {
    return <MissingAuthentication />
  }

  return (
    <Container maxW="640px">
        <Heading as="h1" size="lg" mb={4}>Add location</Heading>
        <Stack spacing={4} mb={6}>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input id="name" placeholder='Name' value={name} onChange={e => setName(e.target.value)} errorBorderColor='crimson'/>
            <FormErrorMessage>Name is required</FormErrorMessage>
          </FormControl>
          {/* Type */}
          <FormControl isRequired>
            <FormLabel htmlFor='type'>Type</FormLabel>
            <Select id="type" onChange={e => setType(e.target.value)} errorBorderColor='crimson'>
              <option value="">Select type</option>
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </Select>
            <FormErrorMessage>Type is required</FormErrorMessage>
          </FormControl>
          {/* Facilities */}
          <FormControl isRequired>
            <FormLabel htmlFor='facilities'>Facilities</FormLabel>
            <SelectList id="facilities" label="facility" options={facilities} onOptionsChanged={(options) => setFacilitiesSelected(options)} errorBorderColor='crimson'/>
            <FormErrorMessage>At least one facility must be set</FormErrorMessage>
          </FormControl>
          {/* Location */}
          <FormControl isRequired>
            <FormLabel htmlFor='select-location'>Select location</FormLabel>
            <Flex id="select-location" flexDirection="column" alignItems="flex-end">
              <Text as="small" color="whiteAlpha.400">{latLng?.lat.toFixed(7) || '0'}, {latLng?.lng.toFixed(7) || '0'}</Text>
              <Map height="30vh" darkMode={colorMode === 'dark'} locations={locations} onPlaceMarker={onPlaceMarker}/>
            </Flex>
            <FormErrorMessage>Geolocation is required</FormErrorMessage>
          </FormControl>
        </Stack>
        <Divider mb={6} />
        <Center>
          <VStack>
            <Button onClick={submitLocation} colorScheme="orange" disabled={formFilled() == false}>Add location</Button>
            <Link href="/map" _hover={{ textDecoration: 'none' }}>Back to map</Link>
          </VStack>
        </Center>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const locations  = await prisma.location.findMany({
    include: {
      type: {
        select: { name: true }
      },
      facilities: {
        select: {
          name: true,
        }
      }
    }
  })

  return { 
    props: { 
      locations: JSON.parse(JSON.stringify(locations)),
    }
  }
}

export default AddPage