import React, { useState } from 'react'
import { Box, Button, ButtonGroup, Container, Divider, Heading, Input, InputGroup, InputRightElement, Stack, Textarea } from '@chakra-ui/react'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import dateFormat from 'dateformat'
import Router from 'next/router'
import { CalendarIcon } from '@chakra-ui/icons'
import prisma from '../lib/prisma'
import NoteGrid from '../components/profile/note-grid/NoteGrid'
import { Note } from '@prisma/client'
import GradeTable from '../components/profile/grade-table/GradeTable'

type ProfileProps = {
  notes: Note[]
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const notes = await prisma.note.findMany({
    where: {
      author: { email: session.user.email },
    },
    select: {
      id: true,
      title: true,
      created_at: true,
      updated_at: true
    }
  })
  return {
    props: { notes: JSON.parse(JSON.stringify(notes)) },
  }
}

const Profile: React.FC<ProfileProps> = (props) => {

  const [noteEditMode, setNoteEditMode] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  
  const { data: session } = useSession()

  const getCurrentDateAndTime = () => {
    const currentDateAndTime = dateFormat(new Date(), 'dddd HH:MM')
    setNoteTitle(currentDateAndTime)
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title: noteTitle, content: noteContent }
      await fetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setNoteTitle('')
      setNoteContent('')
      await Router.push('/profile')
    } catch (error) {
    
    };
  }

  const renderNoteUI = () => {
    if (noteEditMode) {
      return (
        <Stack spacing={3}>
          <InputGroup>
            <Input autoFocus placeholder='Title' value={noteTitle} onChange={e => setNoteTitle(e.target.value)}/>
            <InputRightElement>
              <Button borderRadius={0} colorScheme='orange' onClick={getCurrentDateAndTime}>
                <CalendarIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder='Type something...' value={noteContent} onChange={e => setNoteContent(e.target.value)}/>
          <ButtonGroup>
            <Button  type="submit" colorScheme='orange' variant='solid' disabled={!noteContent || !noteTitle}>
              Button
            </Button>
            <Button colorScheme='orange' variant='outline' onClick={() => setNoteEditMode(false)}>
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      )
    } else {
      return <Button onClick={() => setNoteEditMode(true)}>Write note ✍</Button>
    }
  }

  if (!session) {
    return (
      <Container>
        <Heading size="lg" mb={3}>Profile</Heading>
        <Box bg="white" p={4} borderRadius={5} mb={5}>
          <p>You need to be authenticated to view this page</p>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Heading size="lg" mb={3}>Profile</Heading>
      <GradeTable />
      <Box bg="white" p={4} borderRadius={5}>
        <Heading as="h2" size="md" mb={4}>Notes</Heading>
        <form onSubmit={submitData}>
          {renderNoteUI()}
        </form>
        <Divider mt={4} />
        <NoteGrid notes={props.notes}/>
      </Box>
    </Container>
  )
}

export default Profile