import React from 'react'
import prisma from '../utils/prisma'
import { Note, Location as cLocation } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import { Box, Container, Divider, Flex, Text, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import NoteGrid from '../components/dashboard/note-grid/NoteGrid'
import GradeTable from '../components/dashboard/grade-table/GradeTable'
import Card from '../components/generic/card/Card'
import NoteEditor from '../components/dashboard/note-editor/NoteEditor'
import Loading from '../components/generic/loading/Loading'
import ActivityTracker from '../components/dashboard/activity-tracker/ActivityTracker'

type DashboardProps = {
  notes: Note[],
  locations: cLocation[]
}

const Dashboard: React.FC<DashboardProps> = (props) => {

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (!session) {
    return (
      <Container>
        <Heading size="lg" mb={3}>Dashboard</Heading>
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
    <Container maxW="120ch" py={4}>
      <Heading as="h1" size="lg" mb={3}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Stack spacing={4}>
          <Card>
            <GradeTable />
          </Card>
          <Card>
            <Heading as="h2" size="md" mb={4}>Notes</Heading>
            <NoteEditor />
            <Divider my={4} />
            <NoteGrid notes={props.notes}/>
          </Card>
        </Stack>
        <Card>
          <Heading size="md" mb={4}>Progress</Heading>
          <Text>🔥 54</Text>
          <Divider my={4} />
          <ActivityTracker locations={props.locations} />
        </Card>
      </SimpleGrid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: {} }
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

  const locations = await prisma.location.findMany({
    select: {
      name: true,
      lat: true,
      lon: true
    }
  })

  return {
    props: { 
      notes: JSON.parse(JSON.stringify(notes)),
      locations: JSON.parse(JSON.stringify(locations))
    },
  }
}

export default Dashboard