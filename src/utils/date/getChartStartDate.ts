import { getMinDate } from './common'

export function getChartStartDate(dates: Date[]): Date | undefined {
  const minDate = getMinDate(dates)
  if (!minDate) return undefined

  const chartStartDate = new Date(minDate)
  chartStartDate.setDate(minDate.getDate() - minDate.getDay() + 1)
  chartStartDate.setHours(0, 0)
  return chartStartDate
}
