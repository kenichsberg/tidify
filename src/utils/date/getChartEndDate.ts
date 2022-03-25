import { getMaxDate } from './common'

export function getChartEndDate(dates: Date[]): Date | undefined {
  const maxDate = getMaxDate(dates)
  if (!maxDate) return undefined

  const chartEndDate = new Date(maxDate)
  chartEndDate.setDate(maxDate.getDate() + (6 - maxDate.getDay()))
  chartEndDate.setHours(23, 59, 59)
  return chartEndDate
}
