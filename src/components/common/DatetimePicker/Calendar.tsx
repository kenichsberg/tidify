import { FC, useState, MutableRefObject } from 'react'
import { DayButton, YearMonthControler, Datetime } from './'
import { diffDate, isSameDay } from 'utils/date'

interface DateDisplay {
  date: Date
  disabled: boolean
}

type Props = {
  date: Date | undefined
  datetimeRef: MutableRefObject<Datetime>
  setNextPage: () => void
}

export const Calendar: FC<Props> = ({ date, datetimeRef, setNextPage }) => {
  const now = new Date()
  const initialFirstDay = date
    ? new Date(date.getFullYear(), date.getMonth(), 1)
    : new Date(now.getFullYear(), now.getMonth(), 1)
  const [firstDay, setFirstDay] = useState<Date>(initialFirstDay)
  const dates = getCalendarDates(firstDay)

  return (
    <>
      <YearMonthControler firstDay={firstDay} setFirstDay={setFirstDay} />
      <div className="grid grid-cols-7">
        {weekdays.map((weekday) => getWeekDayLabels(weekday))}
        {dates.map((dateObj) => (
          <DayButton
            key={dateObj.date.getTime()}
            date={dateObj.date}
            isCurrent={isSameDay(now, dateObj.date)}
            isSelected={!!date && isSameDay(date, dateObj.date)}
            disabled={dateObj.disabled}
            onClick={() => {
              datetimeRef.current.year = dateObj.date.getFullYear()
              datetimeRef.current.month = dateObj.date.getMonth()
              datetimeRef.current.day = dateObj.date.getDate()
              setNextPage()
            }}
          />
        ))}
        {[...Array(getPaddingCount(dates.length))].map((_, index) =>
          getPadding(weekdays[index] + index)
        )}
      </div>
    </>
  )
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const getWeekDayLabels = (weekdayName: string) => (
  <span key={weekdayName} className="text-bluegray-400">
    {weekdayName}
  </span>
)

const getPaddingCount = (dateCount: number) => {
  const daysInWeek = 7
  const maxRowCount = 6
  return daysInWeek * maxRowCount - dateCount
}
const getPadding = (key: string) => (
  <span key={key} className="w-12 h-12"></span>
)

export const getCalendarDates = (firstDay: Date): DateDisplay[] => {
  // last month's end dates
  const lastDatesOfLastMonthCount = getDaysCountFromMonday(firstDay.getDay())
  const lastDatesOfLastMonth = getDatesFragment(
    firstDay,
    lastDatesOfLastMonthCount * -1,
    0
  )

  // this month's dates
  const lastDayOfThisMonth = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth() + 1,
    0
  )
  const thisMonthDaysCount = diffDate(firstDay, lastDayOfThisMonth, 'day') + 1
  const datesOfThisMonth = [...Array(thisMonthDaysCount)].map((_, index) => {
    const date = new Date(firstDay)
    date.setDate(firstDay.getDate() + index)
    return date
  })

  // next month's first dates
  const firstDatesOfNextMonthCount =
    6 - getDaysCountFromMonday(lastDayOfThisMonth.getDay())
  const firstDatesOfNextMonth = getDatesFragment(
    lastDayOfThisMonth,
    1,
    firstDatesOfNextMonthCount + 1
  )

  // only dates of this month are clickable
  return [
    ...lastDatesOfLastMonth.map((date) => ({ date: date, disabled: true })),
    ...datesOfThisMonth.map((date) => ({ date: date, disabled: false })),
    ...firstDatesOfNextMonth.map((date) => ({ date: date, disabled: true })),
  ]
}

// convert from js weekday numbers (Sun = 0) to the number with
// Mon = 0, Tue = 1, ... , Sun = 6
const getDaysCountFromMonday = (weekdayNumber: number) => {
  if (weekdayNumber === 0) return 6
  return weekdayNumber - 1
}

// get serial date array FROM referenceDate + offsetStart
// TO referenceDate + offsetEnd
const getDatesFragment = (
  referenceDate: Date,
  offsetStart: number,
  offsetEnd: number
) => {
  if (offsetEnd <= offsetStart) return []

  const startDate = new Date(referenceDate)
  startDate.setDate(referenceDate.getDate() + offsetStart)

  return [...Array(offsetEnd - offsetStart)].map((_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    return date
  })
}
