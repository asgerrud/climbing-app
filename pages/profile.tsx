import React from 'react'
import prisma from '../lib/prisma'
import { Note } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import { Box, Container, Divider, Flex, Text, Heading, SimpleGrid } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import NoteGrid from '../components/profile/note-grid/NoteGrid'
import GradeTable from '../components/profile/grade-table/GradeTable'
import Card from '../components/generic/card/Card'
import NoteEditor from '../components/profile/note-editor/NoteEditor'
import Loading from '../components/generic/loading/Loading'

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

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

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
    <Container maxW="120ch">
      <Heading as="h1" size="lg" mb={3}>Profile</Heading>
      <SimpleGrid columns={{base: 1, md: 2}} spacing={8}>
        <Box>
          <Card>
            <GradeTable />
          </Card>
          <Box bg="white" p={4} mt={8} borderRadius={5}>
            <Heading as="h2" size="md" mb={4}>Notes</Heading>
            <NoteEditor />
            <Divider mt={4} />
            <NoteGrid notes={props.notes}/>
          </Box>
        </Box>
        <Card>
          <Heading size="md">Progress</Heading>
          <Text>(Climbing Streak)</Text>
          <Text>(Graph over hangboard etc)</Text>
        </Card>
      </SimpleGrid>
    </Container>
  )
}

export default Profile