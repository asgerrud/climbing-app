export const sortAlphabetically = (a: string, b: string) => {
  return a.localeCompare(b)
} 

export const sortByDate = (a: Date,b: Date) => {
  return new Date(b).getTime() - new Date(a).getTime()
}