import React from 'react'
import prisma from '../utils/prisma'
import { Note, Location as cLocation, Activity } from '@prisma/client'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'

import { Box, Container, Divider, Text, Heading, SimpleGrid, Stack, Button, useColorMode, Center, VStack, Flex, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Accordion } from '@chakra-ui/react'
import NoteGrid from '../components/dashboard/note-grid/NoteGrid'
import GradeTable from '../components/dashboard/grade-table/GradeTable'
import Card from '../components/generic/card/Card'
import NoteEditor from '../components/dashboard/note-editor/NoteEditor'
import Loading from '../components/generic/loading/Loading'
import ActivityTracker from '../components/dashboard/activity-tracker/ActivityTracker'
import MissingAuthentication from '../components/generic/screens/MissingAuthentication'
import dateFormat from 'dateformat'

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
          <Accordion mt={4} allowToggle>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <b>View activities</b>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack spacing={2}>
                {/* TODO: add pagination */}
                {props.activities.map(activity => { 
                  
                  const date = dateFormat(activity.date, 'dd/mm/yyyy')

                  return (
                    <Flex 
                      key={activity.id} 
                      w="100%"
                      justifyContent="space-between" 
                      alignItems="center" 
                      borderRadius={4}
                    >
                      <span>{activity.Location.name}</span>
                      <span>{date}</span>
                    </Flex>
                  )
                })}
              </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion> 
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
      activities: JSON.parse(JSON.stringify(activities))
    },
  }
}

export default Dashboard