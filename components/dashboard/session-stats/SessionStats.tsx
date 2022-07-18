import { Grid, GridItem, SimpleGrid, Stat, StatLabel, StatNumber, Tag, Text, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

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
  
  const [dailyStreak, setDailyStreak] = useState(0)
  const [weeklyStreak, setWeeklyStreak] = useState(0)
  const [sessionsThisWeek, setSessionsThisWeek] = useState(0)
  const [longestDailyStreak, setLongestDailyStreak] = useState(0)
  const [longestWeeklyStreak, setLongestWeeklyStreak] = useState(0)

  function findMostFrequentLocation(arr){
      return arr.sort((a,b) =>
            arr.filter(v => v===a).length
          - arr.filter(v => v===b).length
      ).pop()
  }

  const favoriteLocation = findMostFrequentLocation(activities.map(activity => activity.Location.name))

  useEffect(() => {
      const url = `/api/profile/${userId}/streak`
      
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()

          const { currentWeeklyStreak, currentDailyStreak, longestDailyStreak, longestWeeklyStreak, sessionsThisWeek } = json
          setDailyStreak(currentDailyStreak)
          setWeeklyStreak(currentWeeklyStreak)
          setSessionsThisWeek(sessionsThisWeek)
          setLongestDailyStreak(longestDailyStreak)
          setLongestWeeklyStreak(longestWeeklyStreak)
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchData()
  }, [activities])

  return (
    <>
      <Grid templateColumns={{base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)'}} mb={6}>
        <GridItem colSpan={1}>
          <Stat>
            <StatLabel textAlign="center">Weekly streak</StatLabel>
            <StatNumber  textAlign="center"color="red.300">{weeklyStreak} {weeklyStreak >= 3 && '🔥'}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={1}>
          <Stat>
            <StatLabel textAlign="center">Sessions this week</StatLabel>
            <StatNumber textAlign="center" color="red.300">{sessionsThisWeek} {sessionsThisWeek >= 3 && '🔥'}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={{ base: 2, sm: 1 }}>
          <Stat>
            <StatLabel textAlign="center">Total sessions</StatLabel>
            <StatNumber textAlign="center" color="red.300">{activities.length}</StatNumber>
          </Stat>
        </GridItem>
      </Grid>
      {/* <VStack alignItems="flex-start">
        <Heading as="h3" size="md" mb={2}>Records</Heading>
        <Text>Daily <Badge>{longestDailyStreak}</Badge></Text>
        <Text>Weekly <Badge>{longestWeeklyStreak}</Badge></Text>
      </VStack> */}
      <Text>Favorite location: <Tag>{favoriteLocation}</Tag></Text>
    </>
  )
}

export default SessionStats