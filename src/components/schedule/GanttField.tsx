import { FC } from 'react'
import { useCache } from 'hooks/index'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'
import { diffDate, getChartStartDate, getChartEndDate } from 'utils/date'
import { ChartRow, ChartColumn, GanttRow } from './'

type Props = {
  tasks: NexusGenFieldTypes['Task'][]
}

export const GanttField: FC<Props> = ({ tasks }) => {
  const startDates = tasks.map((task) => new Date(task.startAt))
  const chartStartDate = getChartStartDate(startDates)
  const endDates = tasks.map((task) => new Date(task.endAt))
  const chartEndDate = getChartEndDate(endDates)
  const weekCount = Math.ceil(diffDate(chartStartDate, chartEndDate, 'week'))

  const { data: _chartHeight } = useCache<number>('chartHeight')
  const chartHeight = _chartHeight ?? 0

  useCache<number>('columnWidth', COLUMN_WIDTH)
  const ganttFieldWidth = COLUMN_WIDTH * 7 * weekCount
  useCache<number>('ganttFieldWidth', ganttFieldWidth)

  return (
    <svg width={ganttFieldWidth} height={chartHeight}>
      <ChartRow tasks={tasks} />
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      <GanttRow tasks={tasks} chartStartDate={chartStartDate} />
    </svg>
  )
}

const COLUMN_WIDTH = 70
