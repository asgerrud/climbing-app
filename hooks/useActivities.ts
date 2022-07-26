 
import { useState, useEffect } from 'react'
import { weekNumber } from 'weeknumber';

const daysBetweenDates = (fromDate, toDate) => Math.round((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24))

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
          longestWeeklyStreak, 
          activityDates
        } = json

        const activityDays = Object.keys(activityDates).map(d => new Date(d))

        const today = new Date()
        const totalSessions = activityDays.length

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
              longest: longestWeeklyStreak
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