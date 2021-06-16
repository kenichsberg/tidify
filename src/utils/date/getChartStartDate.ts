import { getMinDate } from './common'

export const getChartStartDate = (dates: Date[]): Date => {
  const minDate = getMinDate(dates)
  const chartStartDate = new Date(minDate)
  chartStartDate.setDate(minDate.getDate() - minDate.getDay() + 1)
  chartStartDate.setHours(0, 0)
  return chartStartDate
}
