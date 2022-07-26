 
import { useState, useEffect } from 'react'
import { weekNumber } from 'weeknumber';

const resetDateTime = (d: Date) => {
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
}

const daysBetweenDates = (fromDate, toDate) => { 
  resetDateTime(fromDate)
  resetDateTime(toDate)
  return Math.round((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)) 
}


const getNextWeekNumber = (d) => {
  const inSevenDays = new Date(d)
  inSevenDays.setDate(d.getDate() + 7)
  return weekNumber(inSevenDays)
}

const highestWeeklyStreak = (dates: Date[]) => {
  
  // Sort by oldest
  dates.sort((a,b) => a.getTime() - b.getTime())

  if (dates.length === 0) return 0
  if (dates.length === 1) return 1

  let highest: number = 0
  let streak: number = 1
  let currentDate: Date = dates[0]
  
  for (let date of dates) {
    // date is in the same week  

    const expectedNextWeekNumber = getNextWeekNumber(currentDate)


    if (expectedNextWeekNumber === weekNumber(date)) {
      currentDate = date; streak = streak + 1
    }

    // Streak broken
    if ((expectedNextWeekNumber !== weekNumber(date) && weekNumber(currentDate) !== weekNumber(date))) {
      streak = 0; currentDate = date
    }

    // New highest streak found
    if (streak > highest) {
      highest = streak
    }
  }
  return highest
}

const useActivities = (userId: string) => {

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = `/api/profile/${userId}/streak`
    
    const fetchData = async () => {
      try {

        setLoading(true)

        const response = await fetch(url)
        const json = await response.json()

        const { 
          currentDailyStreak, 
          longestDailyStreak, 
          currentWeeklyStreak, 
          activityDates
        } = json

        const activityDays = Object.keys(activityDates).map(d => new Date(d))

        const totalSessions = activityDays.length
        
        const today = new Date()
        const firstDay = activityDays[activityDays.length - 1]
        const latestDay = activityDays[0]

        const daysSinceFirstActivity = daysBetweenDates(firstDay, today)
        const daysSinceMostRecent  = daysBetweenDates(latestDay, today)

        const avgActivitiesPerWeek = totalSessions / daysSinceFirstActivity
        
        const currentWeekNumber = weekNumber(today)
        const sessionsThisWeek = activityDays.filter(date => weekNumber(date) == currentWeekNumber).length
        
        const activityData = {
          streak: {
            daily: {
              current: currentDailyStreak,
              longest: longestDailyStreak
            },
            weekly: {
              current: currentWeeklyStreak,
              longest: highestWeeklyStreak(activityDays)
            }
          },
          sessions: {
            first: firstDay.toLocaleDateString(),
            last: latestDay.toLocaleDateString(),
            daysSinceFirst: daysSinceFirstActivity,
            daysSinceMostRecent: daysSinceMostRecent,
            weekly: {
              current: sessionsThisWeek,
              avg: avgActivitiesPerWeek
            },
            total: totalSessions
          }
        }
        setData(activityData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId])

  return { data, error, loading }

}

export default useActivities