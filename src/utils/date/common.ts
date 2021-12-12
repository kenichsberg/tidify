interface HourMinute {
  h: number
  m: number
}

export interface DurationHM {
  start: HourMinute
  end: HourMinute
}

type DateDiffUnit =
  | 'msec'
  | 'sec'
  | 'min'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

/**
 * Judges if the 2 dates passed by args are the same
 *
 * @param a - Date to be compared
 * @param b - Date to be compared
 * @returns true when dates are the same
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function getNextDate(date: Date): Date {
  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + 1)
  return nextDate
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

/**
 * takes the earliest date from passed array
 *
 * @param dates - dates from which should be taken the earliest one
 * @returns the earliest date
 */
export function getMinDate(dates: Date[] | undefined): Date | undefined {
  if (!dates?.length) {
    return undefined
  }

  const milliseconds = dates.map((date) => date.getTime())
  const minMillisec = Math.min(...milliseconds)

  return new Date(minMillisec)
}

/**
 * takes the latest date from passed array
 *
 * @param dates - dates from which should be taken the latest one
 * @returns the latest date
 */
export function getMaxDate(dates: Date[] | undefined): Date | undefined {
  if (!dates?.length) {
    return undefined
  }

  const milliseconds = dates.map((date) => date.getTime())
  const maxMillisec = Math.max(...milliseconds)

  return new Date(maxMillisec)
}

/**
 * calculates difference of 2 dates of specified unit
 *
 * @param dateA - Date to be compared
 * @param dateB - Date to be compared
 * @param dateDiffUnit - unit of returned calculation
 * @returns the calculated difference of dates
 */
export function diffDate(
  dateA: Date,
  dateB: Date,
  dateDiffUnit?: DateDiffUnit
): number {
  const diffMillisec = dateB.getTime() - dateA.getTime()
  switch (dateDiffUnit) {
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
    case 'month':
      return getMonthsBetween(dateA, dateB)
    case 'year':
      return getYearsBetween(dateA, dateB)
    default:
      return diffMillisec
  }
}

/**
 * calculates how many months between 2 dates
 *
 * @param dateA - Date to be compared
 * @param dateB - Date to be compared
 * @returns how many months between 2 dates
 */
function getMonthsBetween(dateA: Date, dateB: Date): number {
  const yearsDiff = dateB.getFullYear() - dateA.getFullYear()
  const monthsDiff = dateB.getMonth() - dateA.getMonth()
  const daysDiff = dateB.getDate() - dateA.getDate()

  let monthCorrection = 0

  if (daysDiff < 0) {
    monthCorrection = -1
  }

  return yearsDiff * 12 + monthsDiff + monthCorrection
}

/**
 * calculates how many years between 2 dates
 *
 * @param dateA - Date to be compared
 * @param dateB - Date to be compared
 * @returns how many years between 2 dates
 */
function getYearsBetween(dateA: Date, dateB: Date): number {
  const yearsDiff = dateB.getFullYear() - dateA.getFullYear()
  const monthsDiff = dateB.getMonth() - dateA.getMonth()
  const daysDiff = dateB.getDate() - dateA.getDate()

  let yearCorrection = 0

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearCorrection = -1
  }

  return yearsDiff + yearCorrection
}

/**
 * chooses proper unit of date difference, taking account of that how far the 2 dates are
 *
 * @param dateA - Date to be compared
 * @param dateB - Date to be compared
 * @returns optimal date unit
 */
export function getOptimalDateDiffUnit(dateA: Date, dateB: Date): DateDiffUnit {
  switch (true) {
    case diffDate(dateA, dateB, 'year') >= 1:
      return 'year'
    case diffDate(dateA, dateB, 'month') >= 1:
      return 'month'
    case diffDate(dateA, dateB, 'week') >= 1:
      return 'week'
    case diffDate(dateA, dateB, 'day') >= 1:
      return 'day'
    case diffDate(dateA, dateB, 'hour') >= 1:
      return 'hour'
    case diffDate(dateA, dateB, 'min') >= 1:
      return 'min'
    case diffDate(dateA, dateB, 'sec') >= 1:
      return 'sec'
    default:
      return 'msec'
  }
}
