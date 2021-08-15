import { useCache } from 'hooks/index'
//import { diffDate, getChartStartDate, getChartEndDate } from 'utils/date'
import { diffDate } from 'utils/date'
import { ChartRow, ChartColumn, GanttRow } from './'

import { TaskSchema } from 'schema/model/types'

type Props = {
  tasks: Partial<TaskSchema>[]
  chartStartDate: Date
  chartEndDate: Date
  projectStartDate: Date
}

export function GanttField({
  tasks,
  chartStartDate,
  chartEndDate,
  projectStartDate,
}: Props): JSX.Element {
  //const startDates = tasks.map((task) => new Date(task.startAt))
  //const chartStartDate = getChartStartDate(startDates)
  //const endDates = tasks.map((task) => new Date(task.endAt))
  //const chartEndDate = getChartEndDate(endDates)
  //const weekCount = Math.ceil(diffDate(chartStartDate, chartEndDate, 'week'))
  // @ToDo
  const weekCount = Math.ceil(diffDate(chartStartDate, chartEndDate, 'week'))

  const { data: _chartHeight } = useCache<number>('chartHeight')
  const chartHeight = _chartHeight ?? 0

  useCache<number>('columnWidth', COLUMN_WIDTH)
  const ganttFieldWidth = COLUMN_WIDTH * 7 * weekCount
  useCache<number>('ganttFieldWidth', ganttFieldWidth)

  return (
    <svg width={ganttFieldWidth} height={chartHeight}>
      <ChartRow tasks={tasks} />
      {/*
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      <GanttRow tasks={tasks} chartStartDate={chartStartDate} />
        */}
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      <GanttRow
        tasks={tasks}
        chartStartDate={chartStartDate}
        projectStartDate={projectStartDate}
      />
    </svg>
  )
}

const COLUMN_WIDTH = 70
