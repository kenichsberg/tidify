import { useCache } from '@/hooks/index'
import { diffDate } from '@/utils/date'
import { ChartRow, ChartColumn, GanttRow } from '@/components/schedule'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  tasks: TaskWithoutTechnicalColmuns[]
  chartStartDate: Date
  chartEndDate: Date | undefined
  projectStartDate: Date
}

const COLUMN_WIDTH = 70

export function GanttField({
  tasks,
  chartStartDate,
  chartEndDate,
  projectStartDate,
}: Props): JSX.Element {
  const weekCount = getWeekCount(chartStartDate, chartEndDate)

  const { data: _chartHeight } = useCache<number>('chartHeight')
  const chartHeight = _chartHeight ?? 0

  useCache<number>('columnWidth', COLUMN_WIDTH)
  const ganttFieldWidth = COLUMN_WIDTH * 7 * weekCount
  useCache<number>('ganttFieldWidth', ganttFieldWidth)

  return (
    <svg width={ganttFieldWidth} height={chartHeight}>
      <ChartRow tasks={tasks} />
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      {getGantRow(tasks, chartStartDate, projectStartDate, chartEndDate)}
    </svg>
  )
}

function getWeekCount(
  chartStartDate: Date,
  chartEndDate: Date | undefined
): number {
  if (!chartEndDate) {
    return 1
  }
  return Math.ceil(diffDate(chartStartDate, chartEndDate, 'week'))
}

function getGantRow(
  tasks: TaskWithoutTechnicalColmuns[],
  chartStartDate: Date,
  projectStartDate: Date,
  chartEndDate: Date | undefined
): JSX.Element {
  if (!chartEndDate) {
    return <></>
  }

  return (
    <GanttRow
      tasks={tasks}
      chartStartDate={chartStartDate}
      projectStartDate={projectStartDate}
    />
  )
}
