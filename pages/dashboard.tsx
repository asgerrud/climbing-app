import React, { useState } from 'react'
import prisma from '../utils/prisma'
import { Note, Location as cLocation } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import { Box, Container, Divider, Heading, SimpleGrid, Stack, Button, useColorMode, Center } from '@chakra-ui/react'
import NoteGrid from '../components/dashboard/note-grid/NoteGrid'
import GradeTable from '../components/dashboard/grade-table/GradeTable'
import Card from '../components/generic/card/Card'
import NoteEditor from '../components/dashboard/note-editor/NoteEditor'
import Loading from '../components/generic/loading/Loading'
import ActivityTracker from '../components/dashboard/activity-tracker/ActivityTracker'
import MissingAuthentication from '../components/generic/screens/MissingAuthentication'
import SessionStats from '../components/dashboard/session-stats/SessionStats'
import ActivityList from '../components/dashboard/activity-list/ActivityList'
import CustomCalendar from '../components/CustomCalendar'

type DashboardProps = {
  notes: Note[],
  locations: cLocation[]
  activities: {
    id: string
    date: Date,
    Location: {
      name: string
    }
  }[]
}

const Dashboard: React.FC<DashboardProps> = (props) => {

  const { colorMode, toggleColorMode } = useColorMode()
  const { data: session, status } = useSession()
  const [activities, setActivities] = useState<DashboardProps['activities']>(props.activities)

  const findLocationNameById = (id: string): string => {
    for (const location of props.locations) {
      if (location.id === id) {
        return location.name
      }
    }
    return ''
  }

  const onActivityAdded = (locationId: string, date: Date) => {
    const newActivity = {
      id: locationId,
      date: date,
      Location: {
        name: findLocationNameById(locationId)
      }
    }
    activities.push(newActivity)
    activities.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setActivities([...activities])
  }

  if (status === 'loading') {
    return <Loading />
  }
  if (!session && status != 'authenticated') {
    return <MissingAuthentication />
  }


  return (
    <Container maxW="120ch" py={4}>
      <Heading as="h1" size="lg" mb={3}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Stack spacing={4}>
          <Card title="Stats">
            <GradeTable />
          </Card>
          <Card title="Notes">
            <NoteEditor />
            <Divider my={4} />
            <NoteGrid notes={props.notes}/>
          </Card>
        </Stack>
        <Card title="Activity" order={{base: -1, md: 0}}>
          <SessionStats userId={session.user.id} activities={activities}/>
          <Divider my={4}/>
          <Box mb={4}>
            <CustomCalendar activities={activities} />
          </Box>
          <ActivityTracker locations={props.locations} onActivityAdded={onActivityAdded}/>
          <ActivityList activities={activities} />
        </Card>
      </SimpleGrid>
      <Box mt={4}>
        <Card>
          <Center>
            <Button onClick={toggleColorMode}>
              <span>{colorMode === 'light' ? '🌞' : '🌑'}</span>
            </Button>
          </Center>
        </Card>
      </Box>
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
    orderBy: {
      created_at: 'desc',
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
      id: true,
      name: true,
      lat: true,
      lon: true
    }
  })

  const activities = await prisma.activity.findMany({
    where: {
      User: { email: session.user.email }
    },
    orderBy: {
      date: 'desc',
    },
    select: {
      id: true,
      date: true,
      Location: {
        select: {
          name: true
        }
      }
    }
  })

  return {
    props: { 
      notes: JSON.parse(JSON.stringify(notes)),
      locations: JSON.parse(JSON.stringify(locations)),
      activities: JSON.parse(JSON.stringify(activities)),
    }
  }
}

export default Dashboard