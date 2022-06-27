import { getCurrentStreak } from './streak'

const generateStreak = (days: number, startDate: Date = new Date(), skippedIndices: number[] = []): Date[] => {
  let dates = []
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate.getTime())
    d.setDate(startDate.getDate() - i)
    if (skippedIndices.indexOf(i) == -1) {
      dates.push(d)
    } 
  }
  return dates
}

test('Given no dates return 0', () => {
  expect(getCurrentStreak([])).toBe(0)
})

test('Given date older than 24 hours from now, return 0', () => {
  const d = new Date()
  d.setDate(d.getDate() - 3)
  expect(getCurrentStreak([d])).toBe(0)
})

test('Given date within 24 hours from now, return 1', () => {
  const d = new Date()
  d.setHours(d.getHours() - 1)
  expect(getCurrentStreak([d])).toBe(1)
})

test('Given current streak of x, return x', () => {
  for (let i = 2; i <= 100; i++) {
    expect(getCurrentStreak(generateStreak(i))).toBe(i)
  }
})

test('Given old streak, return 0', () => {
  const oldDate = new Date()
  oldDate.setDate(oldDate.getDate() - 3)
  const dates = generateStreak(10, oldDate)
  expect(getCurrentStreak(dates)).toBe(0)
})

test('Given skipped days in streak, return current streak', () => {
  const days = 10
  for(let i = 1; i < days; i++) {
    const dates = generateStreak(10, new Date(), [i])
    expect(getCurrentStreak(dates)).toBe(i)
  }
})