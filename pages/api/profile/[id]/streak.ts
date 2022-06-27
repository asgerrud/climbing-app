import { hoursBetweenDates } from '../../../../utils/date'

export const getCurrentStreak = (dates: Date[]): number => {
  
  if (dates.length == 0) return 0
  
  const today = new Date()
  today.setUTCHours(0,0,0,0)
  
  if (dates.length == 1) {
    return hoursBetweenDates(today, dates[0]) <= 24 ? 1 : 0
  }

  let selectedDate = today, streak = 0
  for (const date of dates) {
    if (hoursBetweenDates(selectedDate, date) > 24) break
    streak++
    selectedDate = date
  }
  
  return streak
}

export default async function handle(req, res) {
  // TODO: implement
  res.json(-1)
}