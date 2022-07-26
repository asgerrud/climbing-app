import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, VStack, Text, AccordionIcon } from '@chakra-ui/react'
import Router from 'next/router'
import React from 'react'
import ActivityItem from './ActivityItem'

type ActivityListProps = {
  activities: ActivityItem[]
}

async function deleteActivity(id: string): Promise<void> {
  console.log("bam!")
  // TODO: add event listener 'onActivityListChanged' with updated activitylist to update UI
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
              <ActivityItem index={idx + 1} activity={activity} onRemove={deleteActivity}/>
            )}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion> 
  )
}

export default ActivityList