import { isSameDay, getNextDate, WORKING_TIME, BREAK_TIMES } from './common'

interface Duration {
  startMs: number | undefined
  endMs: number | undefined
}

type DurationType = 'work' | 'break' | 'count'
type OperationMode = 'start' | 'end'
interface CountOperation {
  millisec: number
  type: DurationType
  mode: OperationMode
}

/**
 * Calculate working hours between start and end
 * 1. create array of operations which indicates
 *    what starts or ends and when.
 * 2. from the above array, create actual sets of durations
 *    to calulate sum of durations
 * 3. sum durations up
 *
 * @param startDatetime - start of datetime for calculation
 * @param endDatetime - end of datetime for calculation
 * @returns - total man-hour between start and end
 */
export function getManHour(startDatetime: Date, endDatetime: Date): number {
  const operations = getCountOperations(startDatetime, endDatetime)
  debugOperations(operations)
  const durations = getDurationsByOperations(operations)
  console.log(
    durations.map((duration) => ({
      startMs: duration?.startMs ? new Date(duration?.startMs) : '',
      endMs: duration?.endMs ? new Date(duration?.endMs) : '',
    }))
  )

  const totalManHour = durations.reduce((total, current) => {
    if (!current.startMs || !current.endMs) return total
    return total + (current.endMs - current.startMs)
  }, 0)

  return totalManHour / (1000 * 60 * 60)
}

function getCountOperations(
  startDatetime: Date,
  endDatetime: Date
): CountOperation[] {
  const targetDate = new Date(startDatetime)
  const operations: CountOperation[] = []

  while (!isSameDay(targetDate, getNextDate(endDatetime))) {
    const shouldSkip = isClosedDay(targetDate)
    //if (shouldSkip) {
    //  targetDate.setDate(targetDate.getDate() + 1)
    //  continue
    //}

    const openTime = new Date(targetDate)
    const closeTime = new Date(targetDate)
    openTime.setHours(WORKING_TIME.start.h, WORKING_TIME.start.m)
    closeTime.setHours(WORKING_TIME.end.h, WORKING_TIME.end.m)

    const breakTimes = BREAK_TIMES.map((breakTime) => {
      const breakStart = new Date(targetDate)
      const breakEnd = new Date(targetDate)
      breakStart.setHours(breakTime.start.h, breakTime.start.m)
      breakEnd.setHours(breakTime.end.h, breakTime.end.m)
      return { start: breakStart, end: breakEnd }
    })

    operations.push(
      {
        millisec: openTime.getTime(),
        type: 'work',
        mode: 'start',
      },
      {
        millisec: closeTime.getTime(),
        type: 'work',
        mode: 'end',
      }
    )
    breakTimes.forEach((breakTime) => {
      operations.push(
        {
          millisec: breakTime.start.getTime(),
          type: 'break',
          mode: 'start',
        },
        {
          millisec: breakTime.end.getTime(),
          type: 'break',
          mode: 'end',
        }
      )
    })

    targetDate.setDate(targetDate.getDate() + 1)
  }

  operations.push(
    {
      millisec: startDatetime.getTime(),
      type: 'count',
      mode: 'start',
    },
    {
      millisec: endDatetime.getTime(),
      type: 'count',
      mode: 'end',
    }
  )

  return filterOperations(operations)
}

function isClosedDay(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6
}

function getDurationsByOperations(operations: CountOperation[]): Duration[] {
  const milliseconds = [...new Set(operations.map((op) => op.millisec))].sort(
    (a, b) => a - b
  )

  let isCountReady = false
  let isWorkReady = false
  const durations: Duration[] = []
  let duration: Duration = { startMs: undefined, endMs: undefined }

  for (const ms of milliseconds) {
    const targetOperations = operations.filter((op) => op.millisec === ms)
    if (
      targetOperations.some((op) => op.type === 'count' && op.mode === 'start')
    ) {
      isCountReady = true
    }
    if (
      targetOperations.some((op) => op.type === 'work' && op.mode === 'start')
    ) {
      isWorkReady = true
    }
    if (
      targetOperations.some((op) => op.type === 'work' && op.mode === 'end') &&
      !duration.startMs
    ) {
      isWorkReady = false
      continue
    }

    // assign values to duration object
    // only after count started & work started
    if (!isCountReady || !isWorkReady) continue

    // duration start
    if (
      targetOperations.some(
        (op) =>
          (op.type === 'count' && op.mode === 'start') ||
          (op.type === 'work' && op.mode === 'start') ||
          (op.type === 'break' && op.mode === 'end')
      )
    ) {
      duration.startMs = ms
    }

    if (!duration.startMs) continue

    // duration stop for break (restart after break ends)
    if (
      targetOperations.some((op) => op.type === 'break' && op.mode === 'start')
    ) {
      duration.endMs = ms
      durations.push(duration)
      duration = { startMs: undefined, endMs: undefined }
      continue
    }

    // duration stop, restart after work starts next day
    if (
      targetOperations.some((op) => op.type === 'work' && op.mode === 'end')
    ) {
      duration.endMs = ms
      durations.push(duration)
      duration = { startMs: undefined, endMs: undefined }
      isWorkReady = false
      continue
    }

    // duration stop and count ends
    if (
      targetOperations.some((op) => op.type === 'count' && op.mode === 'end')
    ) {
      duration.endMs = ms
      durations.push(duration)
      break
    }
  }

  return durations
}

function filterOperations(operations: CountOperation[]): CountOperation[] {
  const startMsArr =
    operations
      .filter(
        (op) =>
          (op.type === 'count' && op.mode === 'start') ||
          (op.type === 'work' && op.mode === 'start')
      )
      ?.map((op) => op.millisec) ?? []
  const startMs = Math.min(...startMsArr)
  const endMsArr =
    operations
      .filter((op) => op.type === 'count' && op.mode === 'end')
      ?.map((op) => op.millisec) ?? []
  const countEndMs = Math.max(...endMsArr)
  const targetOperations = operations.filter(
    (op) => startMs <= op.millisec && op.millisec <= countEndMs
  )
  return targetOperations
}

// for debug use only
function debugOperations(_operations: CountOperation[]) {
  const operations = [..._operations]
  operations.sort((a, b) => a.millisec - b.millisec)
  const operationFormatted = operations.map((op) => ({
    date: new Date(op.millisec),
    type: op.type,
    op: op.mode,
  }))
  console.log(operationFormatted)
}
