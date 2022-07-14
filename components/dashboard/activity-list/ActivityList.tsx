import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, VStack, Text, AccordionIcon } from '@chakra-ui/react'
import { Activity } from '@prisma/client';
import dateFormat from 'dateformat'
import React from 'react'

type ActivityListProps = {
  activities: {
    id: string
    date: Date,
    Location: {
      name: string
    }
  }[]
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
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
          {activities.map((activity, idx) => { 
            const date = dateFormat(activity.date, 'dd/mm/yyyy')

            return (
              <Flex 
                key={activity.id} 
                w="100%"
                justifyContent="space-between" 
                alignItems="center" 
                borderRadius={4}
              >
                <Flex>
                  <Text as="span" color="whiteAlpha.300" mr={1}>{idx + 1}</Text>
                  <Text> {activity.Location.name}</Text>
                </Flex>
                <span>{date}</span>
              </Flex>
            )
          })}
        </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion> 
  )
}

export default ActivityList