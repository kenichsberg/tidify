import { isSameDay, getNextDate, WORKING_TIME } from './common'
import { getManHour } from './getManHour'

export const getGrossDays = (
  startDatetime: Date,
  endDatetime: Date
): number => {
  if (isSameDay(startDatetime, endDatetime)) {
    return getManHour(startDatetime, endDatetime) / manHourPerDay
  }

  const dayStartAfterStartDate = getNextDate(startDatetime)
  dayStartAfterStartDate.setHours(0, 0)
  const dayEndBeforeEndDate = new Date(endDatetime)
  dayEndBeforeEndDate.setHours(0, 0)

  const fistDayDecimal = diffDecimalDay(startDatetime, dayStartAfterStartDate)
  const inBetweenDays = diffIntDays(dayStartAfterStartDate, dayEndBeforeEndDate)
  const endDayDecimal = diffDecimalDay(dayEndBeforeEndDate, endDatetime)
  console.log(manHourPerDay, fistDayDecimal, inBetweenDays, endDayDecimal)

  return fistDayDecimal + inBetweenDays + endDayDecimal
}

const abstractStartTime = new Date('1900-01-01')
abstractStartTime.setHours(WORKING_TIME.start.h, WORKING_TIME.start.m)
const abstractEndTime = new Date('1900-01-01')
abstractEndTime.setHours(WORKING_TIME.end.h, WORKING_TIME.end.m)
const manHourPerDay = getManHour(abstractStartTime, abstractEndTime)

// get days diff count in integer regardless of time
const diffIntDays = (a: Date, b: Date): number =>
  (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)

// get decimal ratio of hours / manHourPerDay from 2 different dates
const diffDecimalDay = (a: Date, b: Date): number =>
  getManHour(a, b) / manHourPerDay
