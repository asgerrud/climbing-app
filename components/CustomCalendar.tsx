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

  return (
    <Calendar 
      locale="en" 
      minDetail="year" 
      tileClassName={({date, view}) => hasActivity(date, view) ? 'calendar__has-activity' : ''} 
      formatShortWeekday={(locale, date) => dateFormat(date, 'ddd').charAt(0)}
    />
  )
}

export default CustomCalendar