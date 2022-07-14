import { getStreak } from 'datetime-streak'
import prisma from '../../../../utils/prisma'

export default async function handle(req, res) {
  const { id } = req.query
  console.log(id)
  const activityDates = await prisma.activity.findMany({
    where: {
      User: { id: `${id}` }
    },
    orderBy: {
      date: 'desc',
    },
    select: { date: true }
  })
  const dates = activityDates.map(d => new Date(d.date))
  const streak = getStreak(dates, '23:59:59')

  res.json(streak)
}