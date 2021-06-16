import { getMaxDate } from './common'

export const getChartEndDate = (dates: Date[]): Date => {
  const maxDate = getMaxDate(dates)
  const chartEndDate = new Date(maxDate)
  chartEndDate.setDate(maxDate.getDate() + (6 - maxDate.getDay()))
  chartEndDate.setHours(23, 59, 59)
  return chartEndDate
}
