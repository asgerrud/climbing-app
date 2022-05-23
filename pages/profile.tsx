import { Box, Button, ButtonGroup, Container, Heading, Input, InputGroup, InputRightElement, Stack, Table, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react'
import dateFormat from "dateformat";
import { CalendarIcon } from '@chakra-ui/icons';

const Profile = (props) => {

  const [noteEditMode, setNoteEditMode] = useState(false)
  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  
  const getCurrentDateAndTime = () => {
    const currentDateAndTime = dateFormat(new Date(), "mm/d/yyyy HH:MM")
    setNoteTitle(currentDateAndTime)
  }

  const renderNoteUI = () => {
    if (noteEditMode) {
      return (
        <Stack spacing={3}>
          <InputGroup>
            <Input placeholder='Title' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}/>
            <InputRightElement>
              <Button borderRadius={0} colorScheme='orange' onClick={getCurrentDateAndTime}>
                <CalendarIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder='Type something...' value={noteContent} onChange={e => setNoteContent(e.target.value)}/>
          <ButtonGroup>
            <Button colorScheme='orange'variant='solid'>Save</Button>
            <Button 
              colorScheme='orange' 
              variant='outline'
              onClick={() => setNoteEditMode(false)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      )
    } else {
      return <Button onClick={() => setNoteEditMode(true)}>Write note ✍</Button>
    }
  }

  return (
    <Container>
      <Heading size="lg" mb={3}>Profile</Heading>
      <Box bg="white" p={4} borderRadius={5} mb={5}>
        <Heading as="h2" size="md" mb={4}>Stats</Heading>
          <TableContainer>
            <Table variant='simple'  size='sm'>
              <Thead>
                <Tr>
                  <Th>Grade</Th>
                  <Th>Completed</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>V1</Td>
                  <Td>20</Td>
                </Tr>
                <Tr>
                  <Td>V2</Td>
                  <Td>15</Td>
                </Tr>
                <Tr>
                  <Td>V3</Td>
                  <Td>4</Td>
                </Tr>
                <Tr>
                  <Td>V4</Td>
                  <Td>1</Td>
                </Tr>
                <Tr>
                  <Td>V5</Td>
                  <Td>0</Td>
                </Tr>
                <Tr>
                  <Td>V6</Td>
                  <Td>0</Td>
                </Tr>
                <Tr>
                  <Td>V7</Td>
                  <Td>0</Td>
                </Tr>
              </Tbody>
            </Table>
        </TableContainer>
      </Box>
      <Box bg="white" p={4} borderRadius={5}>
        <Heading as="h2" size="md" mb={4}>Notes</Heading>
        {renderNoteUI()}
      </Box>
    </Container>
  )
}

export default Profile