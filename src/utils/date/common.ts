export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const getNextDate = (date: Date): Date => {
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + 1)
  return nextDate
}

interface HourMinute {
  h: number
  m: number
}
export interface DurationHM {
  start: HourMinute
  end: HourMinute
}
export const WORKING_TIME: DurationHM = {
  start: { h: 9, m: 0 },
  end: { h: 18, m: 0 },
}
export const BREAK_TIMES: DurationHM[] = [
  {
    start: { h: 12, m: 0 },
    end: { h: 13, m: 0 },
  },
]

export const getMinDate = (dates: Date[]): Date => {
  const milliseconds = dates.map((date) => date.getTime())
  const minMillisec = Math.min(...milliseconds)
  return new Date(minMillisec)
}

export const getMaxDate = (dates: Date[]): Date => {
  const milliseconds = dates.map((date) => date.getTime())
  const maxMillisec = Math.max(...milliseconds)
  return new Date(maxMillisec)
}

export const diffDate = (
  dateA: Date,
  dateB: Date,
  unit?: 'msec' | 'sec' | 'min' | 'hour' | 'day' | 'week'
): number => {
  const diffMillisec = dateB.getTime() - dateA.getTime()
  switch (unit) {
    case 'msec':
      return diffMillisec
    case 'sec':
      return diffMillisec / 1000
    case 'min':
      return diffMillisec / (1000 * 60)
    case 'hour':
      return diffMillisec / (1000 * 60 * 60)
    case 'day':
      return diffMillisec / (1000 * 60 * 60 * 24)
    case 'week':
      return diffMillisec / (1000 * 60 * 60 * 24 * 7)
    default:
      return diffMillisec
  }
}
