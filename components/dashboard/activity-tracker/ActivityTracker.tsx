
import { CalendarIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react'
import dateFormat from 'dateformat'
import { useState } from 'react'
import { Location as cLocation } from '@prisma/client'
import { getDistanceBetween } from '../../../utils/geo'

type ActivityTrackerProps = {
  locations: cLocation[]
  onActivityAdded?: (locationId: String, date: Date) => void
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ locations, onActivityAdded }) => {

  const today = dateFormat(new Date(), 'yyyy-mm-dd')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [locationId, setLocationId] = useState('')
  const [date, setDate] = useState(today)
  
  const findNearestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        const curCoords = { lat: latitude, lon: longitude }
        const nearestLocation = locations.reduce((a: cLocation, b: cLocation) => {
          const distA = getDistanceBetween(curCoords, { lat: a.lat, lon: a.lon })
          const distB = getDistanceBetween(curCoords, { lat: b.lat, lon: b.lon })
          return distA < distB ? a : b
        })
        setLocationId(nearestLocation.id)
      })
    } else {
      // error handling
      alert('An error occurred fetching your location')
    }
  }

  async function addActivity(): Promise<void> {
    const body = { location: locationId, date: date }
    await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then((response) => {
      if (response.ok) {
        onClose()
        onActivityAdded(locationId, new Date(date))
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .catch((error) => {
      alert(error)
    })
  }


  return (
    <>
      <Button colorScheme="orange" size="md" onClick={onOpen}>Add activity</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Stack spacing={4}>
                {/* TODO: fetch dynamically */}
                <HStack>
                  <Select icon={<ChevronDownIcon />} placeholder='Select location' value={locationId} onChange={(e) => setLocationId(e.target.value)} required>
                    {locations.sort().map(location => {
                      const name = location.name
                      return (
                        <option key={location.id} value={location.id}>{name}</option>
                      )
                    })}
                  </Select>
                  <Button px={8} onClick={findNearestLocation}>Find location</Button>
                </HStack>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <CalendarIcon color='gray.300' />
                  </InputLeftElement>
                  <Input 
                    type='date' 
                    value={date} 
                    onChange={e => setDate(e.target.value)}
                  />
                </InputGroup>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Stack direction='row' spacing={2} align='center'>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
              <Button colorScheme='orange' onClick={addActivity} disabled={locationId == '' || date == ''}>
                Save
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ActivityTracker