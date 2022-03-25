import {
  WORKING_TIME,
  BREAK_TIMES,
  weekends,
  isSameDay,
  diffDate,
} from '@/utils/date'

type Duration = {
  start: Date
  end: Date
}

export class ManHourCalculator {
  private workingTime: Duration = { start: new Date(), end: new Date() }
  private rests: Duration[] = []

  public getGrossDurationDays(
    startDatetime: Date,
    endDatetime: Date,
    acc: number = 0
  ): number {
    // finish calculation if start and end are the same day
    if (isSameDay(startDatetime, endDatetime)) {
      if (weekends.includes(startDatetime.getDay())) {
        return acc
      }

      const workingTime = this._getWorkingTime(startDatetime)
      const maxManHour = this._getManHourPerDay(
        workingTime.start,
        workingTime.end
      )
      if (maxManHour === 0) throw new Error('maxManHour shoud not be 0')

      const manHour = this._getManHourPerDay(startDatetime, endDatetime)
      return acc + manHour / maxManHour
    }

    // if weekend, count as 1 day
    if (weekends.includes(startDatetime.getDay())) {
      const nextStart = this._getNextDayStart(startDatetime)
      return this.getGrossDurationDays(nextStart, endDatetime, acc + 1)
    }

    // if week days, add manHour/total
    const workingTime = this._getWorkingTime(startDatetime)
    const maxManHour = this._getManHourPerDay(
      workingTime.start,
      workingTime.end
    )
    if (maxManHour === 0) throw new Error('maxManHour shoud not be 0')

    const manHour = this._getManHourPerDay(startDatetime, workingTime.end)
    const nextStart = this._getNextDayStart(startDatetime)

    return this.getGrossDurationDays(
      nextStart,
      endDatetime,
      acc + manHour / maxManHour
    )
  }

  public getEndDatetimeByManHour(startDatetime: Date, manHour: number): Date {
    let diff = 0
    let offset = 0
    let endDatetime = new Date()
    do {
      endDatetime = new Date(startDatetime.getTime())
      endDatetime.setHours(endDatetime.getHours() + manHour + offset)

      const provisionalManHour = this.getManHour(startDatetime, endDatetime)
      diff = manHour - provisionalManHour
      offset += diff
    } while (diff > 0)

    return endDatetime
  }

  public getManHour(
    durationStart: Date,
    durationEnd: Date,
    acc: number = 0
  ): number {
    if (isSameDay(durationStart, durationEnd)) {
      console.log({
        acc,
        last: this._getManHourPerDay(durationStart, durationEnd),
      })
      return acc + this._getManHourPerDay(durationStart, durationEnd)
    }

    const current = this._getManHourPerDay(durationStart)
    const nextStart = new Date(durationStart.getTime())
    nextStart.setDate(durationStart.getDate() + 1)
    nextStart.setHours(WORKING_TIME.start.h, WORKING_TIME.start.m)
    console.log({ nextStart, durationEnd, acc, current })

    return this.getManHour(nextStart, durationEnd, acc + current)
  }

  private _getNextDayStart(thisDay: Date): Date {
    const nextStart = new Date(thisDay.getTime())
    nextStart.setDate(thisDay.getDate() + 1)
    nextStart.setHours(WORKING_TIME.start.h, WORKING_TIME.start.m)
    return nextStart
  }

  private _getManHourPerDay(
    durationStart: Date,
    _durationEnd?: Date | undefined
  ): number {
    const thisDay = new Date(durationStart)
    if (weekends.includes(thisDay.getDay())) {
      return 0
    }

    this._setWorkingTime(thisDay)
    this._setRests(thisDay)

    const durationEnd = _durationEnd ?? new Date(durationStart.getTime())
    if (!_durationEnd) {
      durationEnd.setHours(WORKING_TIME.end.h, WORKING_TIME.end.m, 0)
    }

    const calcStart =
      durationStart.getTime() < this.workingTime.start.getTime()
        ? new Date(this.workingTime.start.getTime())
        : new Date(durationStart.getTime())
    const calcEnd =
      this.workingTime.end.getTime() < durationEnd.getTime()
        ? new Date(this.workingTime.end.getTime())
        : new Date(durationEnd.getTime())
    if (calcEnd.getTime() < calcStart.getTime()) {
      return 0
    }

    const restsInDuration = this.rests.reduce<Duration[]>((acc, current) => {
      if (current.end < calcStart || calcEnd < current.start) return acc

      const start = calcStart < current.start ? current.start : calcStart
      const end = current.end < calcEnd ? current.end : calcEnd
      return [...acc, { start, end }]
    }, [])

    const totalRestHour = restsInDuration.reduce<number>((acc, current) => {
      return acc + diffDate(current.start, current.end, 'hour')
    }, 0)

    const grossWorkingHour = diffDate(calcStart, calcEnd, 'hour')

    return grossWorkingHour - totalRestHour
  }

  private _getWorkingTime(thisDay: Date) {
    const workingTime = { start: new Date(thisDay), end: new Date(thisDay) }
    workingTime.start.setTime(thisDay.getTime())
    workingTime.start.setHours(WORKING_TIME.start.h, WORKING_TIME.start.m, 0, 0)
    workingTime.end.setTime(thisDay.getTime())
    workingTime.end.setHours(WORKING_TIME.end.h, WORKING_TIME.end.m, 0, 0)

    return workingTime
  }

  private _setWorkingTime(thisDay: Date) {
    this.workingTime.start.setTime(thisDay.getTime())
    this.workingTime.start.setHours(
      WORKING_TIME.start.h,
      WORKING_TIME.start.m,
      0,
      0
    )
    this.workingTime.end.setTime(thisDay.getTime())
    this.workingTime.end.setHours(WORKING_TIME.end.h, WORKING_TIME.end.m, 0, 0)
  }

  private _setRests(thisDay: Date) {
    this.rests = BREAK_TIMES.map((rest) => {
      const start = new Date(thisDay.getTime())
      start.setHours(rest.start.h, rest.start.m, 0, 0)
      const end = new Date(thisDay.getTime())
      end.setHours(rest.end.h, rest.end.m, 0, 0)
      return { start, end }
    })
  }

  private _validateInit(durationStart: Date, durationEnd: Date | undefined) {
    if (!durationEnd || !isSameDay(durationStart, durationEnd))
      throw new Error('duration should be in the same day')
  }
}
