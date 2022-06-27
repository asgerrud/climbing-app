export const hoursBetweenDates = (a: Date, b: Date) => {
  const msBetweenDates = Math.abs(a.getTime() - b.getTime())
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
  return hoursBetweenDates
}
