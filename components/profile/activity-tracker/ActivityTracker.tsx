
import { CalendarIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react'
import dateFormat from 'dateformat'
import { useState } from 'react'
import GradeNumberStepper from '../grade-number-stepper/GradeNumberStepper'
import { Location as cLocation } from '@prisma/client'
import { getDistanceBetween } from '../../../utils/geo'

type ActivityTrackerProps = {
  locations: cLocation[]
}

// TEMPORARY SOLUTION
const grades = ['green','yellow','orange','blue','purple','red','black','pink']  

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ locations }) => {

  const today = dateFormat(new Date(), 'yyyy-mm-dd')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(today)

  const findNearest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        const curCoords = { lat: latitude, lon: longitude }
        const nearestLocation = locations.reduce((a: cLocation, b: cLocation) => {
          const distA = getDistanceBetween(curCoords, { lat: a.lat, lon: a.lon })
          const distB = getDistanceBetween(curCoords, { lat: b.lat, lon: b.lon })
          return distA < distB ? a : b
        })
        setLocation(nearestLocation.name)
      })
    } else {
      // error handling
    }
  }

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>Add activity</Button>

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
                  <Select icon={<ChevronDownIcon />} placeholder='Select gym' value={location} required>
                    {locations.sort().map(location => {
                      const name = location.name
                      return (
                        <option key={location.id} value={name}>{name}</option>
                      )
                    })}
                  </Select>
                  <Button px={8} onClick={findNearest}>Find location</Button>
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
                <Stack spacing={4}>
                  {grades.map(grade => {
                    const color = grade === 'black' ? 'black' : `${grade}.500`
                    return (
                      <GradeNumberStepper key={grade} color={color} />
                    )
                  })}
                </Stack>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Stack direction='row' spacing={2} align='center'>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
              <Button colorScheme='orange'>
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