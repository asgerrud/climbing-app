
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import GradeNumberStepper from '../grade-number-stepper/GradeNumberStepper'

type ActivityTrackerProps = {}

const ActivityTracker: React.FC<ActivityTrackerProps> = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [location, setLocation] = useState('Boulders Sydhavn')

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
              {/* TODO: fetch dynamically */}
              <Select icon={<ChevronDownIcon />} mb={4} placeholder='Select gym' defaultValue="Boulders Sydhavn" required>
                <option value='Boulders Sydhavn'>Boulders Sydhavn</option>
              </Select>

              <Stack spacing={4}>
                <GradeNumberStepper color="green.500" />
                <GradeNumberStepper color="yellow.500" />
                <GradeNumberStepper color="orange.500" />
                <GradeNumberStepper color="blue.500" />
                <GradeNumberStepper color="purple.500" />
                <GradeNumberStepper color="red.500" />
                <GradeNumberStepper color="black" />
                <GradeNumberStepper color="pink.500" />
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
            <Button colorScheme='orange' mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ActivityTracker