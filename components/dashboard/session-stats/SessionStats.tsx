import { Badge, Box, Divider, Flex, Heading, HStack, SimpleGrid, Stat, StatHelpText, StatLabel, StatNumber, Table, TableContainer, Tag, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
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
      const url = `http://localhost:3000/api/profile/${userId}/streak`
      
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          const { currentWeeklyStreak, currentDailyStreak, longestDailyStreak, longestWeeklyStreak } = json
          setDailyStreak(currentDailyStreak)
          setWeeklyStreak(currentWeeklyStreak)
          setLongestDailyStreak(longestDailyStreak)
          setLongestWeeklyStreak(longestWeeklyStreak)
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchData()
  }, [])

  return (
    <>
      <SimpleGrid columns={3}>
        <Stat>
          <StatLabel textAlign="center">Weekly streak</StatLabel>
          <StatNumber  textAlign="center"color="red.300">{weeklyStreak} {weeklyStreak > 1 && '🔥'}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel textAlign="center">Daily streak</StatLabel>
          <StatNumber textAlign="center" color="red.300">{dailyStreak} {dailyStreak > 1 && '🔥'}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel textAlign="center">Total sessions</StatLabel>
          <StatNumber textAlign="center" color="red.300">{activities.length}</StatNumber>
        </Stat>
      </SimpleGrid>
      <VStack my={4} alignItems="flex-start">
        <Text>Daily <Badge>{longestDailyStreak}</Badge></Text>
        <Text>Weekly <Badge>{longestWeeklyStreak}</Badge></Text>
        <Text>Favorite location: <Tag>{favoriteLocation}</Tag></Text>
      </VStack>
    </>
  )
}

export default SessionStats