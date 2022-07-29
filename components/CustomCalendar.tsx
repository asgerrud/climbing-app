import { Box, Button, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Tooltip, UnorderedList } from '@chakra-ui/react';
import dateFormat from 'dateformat';
import React from 'react'
import Calendar from 'react-calendar'

const CustomCalendar = ({ activities }) => {

  const activitiesByDate = activities.reduce((group, activity) => {
    const date = new Date(activity.date).toLocaleDateString()
    group[date] = group[date] ?? []
    group[date].push(activity)
    return group
  }, {})

  const hasActivity = (date, view) => {
    if (view === 'month') return activitiesByDate[date.toLocaleDateString()] != null
    if (view === 'year') return activities.some(activity => {
      const activityDate = new Date(activity.date)
      const sameYear = date.getFullYear() === activityDate.getFullYear()
      const sameMonth = date.getMonth() === activityDate.getMonth()
      return sameYear && sameMonth
    })
  }

  const renderActivitiesByDate = (date) => {
    
    const activities = activitiesByDate[date.toLocaleDateString()]

    return (
      <Popover>
        <PopoverTrigger>
          <p>X</p>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader textAlign="left">Activities</PopoverHeader>
          <PopoverBody textAlign="left">
            <UnorderedList mb={4}>
              {activities && activities.map((activity, idx) => (
                <ListItem key={idx}>{activity.Location.name}</ListItem>
              ))}
            </UnorderedList>
            <Button size="sm">Add activity</Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Calendar 
      locale="en" 
      minDetail="year" 
      tileClassName={({date, view}) => hasActivity(date, view) ? 'calendar__has-activity' : ''} 
      formatShortWeekday={(locale, date) => dateFormat(date, 'ddd').charAt(0)}
      tileContent={({ date, view }) => view === 'month' && renderActivitiesByDate(date)}
    />
  )
}

export default CustomCalendar