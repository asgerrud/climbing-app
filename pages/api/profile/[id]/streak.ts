import { getStreak } from 'datetime-streak'
import prisma from '../../../../utils/prisma'

const getWeekNumber = (date) => {
  
  const startDate = new Date(date.getFullYear(), 0, 1);
  
  const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
  const weekNumber = Math.ceil(days / 7)

  return weekNumber
}

export default async function handle(req, res) {
  const { id } = req.query
  const activities = await prisma.activity.findMany({
    where: {
      User: { id: `${id}` }
    },
    orderBy: {
      date: 'desc',
    },
    select: { date: true }
  })
  
  const activityDates = activities.map(d => new Date(d.date))
  const streak = getStreak(activityDates, '23:59:59')
  
  // Visits this week
  const currentWeekNumber = getWeekNumber(new Date())
  const sessionsThisWeek = activityDates.filter(date => getWeekNumber(date) == currentWeekNumber).length
  streak.sessionsThisWeek = sessionsThisWeek
  
  res.json(streak)
}