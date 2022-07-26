import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, VStack, Text, AccordionIcon } from '@chakra-ui/react'
import dateFormat from 'dateformat'
import React from 'react'
import ActivityItem from './ActivityItem'

type ActivityListProps = {
  activities: ActivityItem[]
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
        <AccordionPanel pb={4} maxH="360px" overflowY="scroll">
          <VStack spacing={2}>
            {activities.map((activity, idx) => 
              <ActivityItem index={idx + 1} activity={activity} />
            )}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion> 
  )
}

export default ActivityList