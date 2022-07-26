import { Badge, Box, Center, Grid, GridItem, SimpleGrid, Spinner, Stack, Stat, StatHelpText, StatLabel, StatNumber, Tag, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import useActivities from '../../../hooks/useActivities'
import Loading from '../../generic/loading/Loading';

type SessionStatsProps = {
  userId: string,
  activities: {
    id: string
    date: Date,
    Location: {
      name: string
    }
  }[]
}

const SessionStats: React.FC<SessionStatsProps> = ({ userId, activities }) => {

  function findMostFrequentLocation(arr){
      return arr.sort((a,b) =>
            arr.filter(v => v===a).length
          - arr.filter(v => v===b).length
      ).pop()
  }

  const favoriteLocation = findMostFrequentLocation(activities.map(activity => activity.Location.name))

  const { data, error, loading } = useActivities(userId)

  if (loading || data === null) {
    return <Loading />
  }

  const { streak, sessions } = data

  const printDaysAgo = (number) => {
    if (number == 0) return 'today'
    if (number == 1) return `${number} day ago`
    return `${number} days ago`
  }

  return (
    <>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }} mb={6}>
        <GridItem colSpan={1}>
          <ActivityStat 
            label="Weekly streak"
            value={streak.weekly.current}
            subtext={`Longest: ${streak.weekly.longest}`}
            flameThreshold={3}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <ActivityStat 
            label="Sessions this week"
            value={sessions.weekly.current}
            subtext={`Average: ${sessions.weekly.avg.toFixed(2)}`} /* TODO: average per active week */
            flameThreshold={3}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1 }}>
          <ActivityStat 
            label="Total sessions"
            value={sessions.total}
          />
        </GridItem>
      </Grid>
      <SimpleGrid columns={2} spacing={4}>
        <Stack>
          <Box>
            <Text>
              <Text fontWeight="bold">First session</Text>
              {sessions?.first} <small>({printDaysAgo(sessions.daysSinceFirst)})</small>
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Last session</Text>
            <Text>{sessions?.last} <small>({printDaysAgo(sessions.daysSinceMostRecent)})</small></Text>
          </Box>
        </Stack>
        <Stack>
          <Box>
            <Text fontWeight="bold">Records</Text>
            <Text>Days in a row: <Badge>{streak.daily.longest}</Badge></Text>
            <Text>Weeks in a row: <Badge>{streak.weekly.longest}</Badge></Text>
          </Box>
        </Stack>
      </SimpleGrid>
      <Box mt={4}>
        <Text fontWeight="bold">Favorite location</Text>
        <Text>{favoriteLocation}</Text>
      </Box>
    </>
  )
}

type ActivityStatProps = {
  label: string,
  value: number,
  subtext?: string,
  flameThreshold?: number,
}

const ActivityStat: React.FC<ActivityStatProps> = ({ label, value, subtext, flameThreshold }) => {
  return (
    <Stat>
      <StatLabel textAlign="center">{label}</StatLabel>
      {value
        ? <StatNumber textAlign="center"color="red.300">{value} {flameThreshold && value >= flameThreshold && '🔥'} </StatNumber>
        : <Center py={4}><Spinner /></Center>
      }
      {subtext && (
        <StatHelpText textAlign="center">{subtext}</StatHelpText>
      )}
    </Stat>
  )
}

export default SessionStats