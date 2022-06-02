import React from 'react'
import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/react'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'
import NoteGrid from '../components/profile/note-grid/NoteGrid'
import { Note } from '@prisma/client'
import GradeTable from '../components/profile/grade-table/GradeTable'
import Card from '../components/generic/card/Card'
import NoteEditor from '../components/profile/note-editor/NoteEditor';
import { WarningIcon } from '@chakra-ui/icons';

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

  const { data: session } = useSession()

  if (!session) {
    return (
      <Container>
        <Heading size="lg" mb={3}>Profile</Heading>
        <Card>
          <Box display="flex" justifyContent="center">
            <Flex alignItems="center" color="red.400">
              <WarningIcon mr={2}/> <p>You need to be authenticated to view this page</p>
            </Flex>
          </Box>
        </Card>
      </Container>
    )
  }

  return (
    <Container>
      <Heading size="lg" mb={3}>Profile</Heading>
      <GradeTable />
      <Box bg="white" p={4} borderRadius={5}>
        <Heading as="h2" size="md" mb={4}>Notes</Heading>
        <NoteEditor />
        <Divider mt={4} />
        <NoteGrid notes={props.notes}/>
      </Box>
    </Container>
  )
}

export default Profile