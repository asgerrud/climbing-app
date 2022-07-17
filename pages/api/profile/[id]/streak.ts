import { getStreak } from 'datetime-streak'
import { weekNumber } from 'weeknumber';
import prisma from '../../../../utils/prisma'

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
  const streak = getStreak(activityDates, '00:00:00')
  
  // Visits this week
  const currentWeekNumber = weekNumber(new Date())
  const sessionsThisWeek = activityDates.filter(date => weekNumber(date) == currentWeekNumber).length
  streak.sessionsThisWeek = sessionsThisWeek
  
  res.json(streak)
}