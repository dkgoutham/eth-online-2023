export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    hour12: true,
  }

  const formatter = new Intl.DateTimeFormat('en-US', options)

  return formatter.format(date)
}

export const getHourAndMinutes = (timestamp: number): string => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${hour}:${minute}`
}
