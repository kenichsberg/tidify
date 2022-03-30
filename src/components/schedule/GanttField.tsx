import { useCache } from '@/hooks/index'
import { diffDate } from '@/utils/date'
import {
  ChartBase,
  ChartRow,
  ChartColumn,
  GanttRow,
} from '@/components/schedule'
import { useProjects } from '@/contexts/project'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  chartStartDate: Date
  chartEndDate: Date | undefined
}

const COLUMN_WIDTH = 70

export function GanttField({
  chartStartDate,
  chartEndDate,
}: Props): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) throw new Error('context value undefined')

  const weekCount = getWeekCount(chartStartDate, chartEndDate)

  const { data: _chartHeight } = useCache<number>('chartHeight')
  const chartHeight = _chartHeight ?? 0

  useCache<number>('columnWidth', COLUMN_WIDTH)
  const ganttFieldWidth = COLUMN_WIDTH * 7 * weekCount
  useCache<number>('ganttFieldWidth', ganttFieldWidth)

  return (
    <svg width={ganttFieldWidth} height={chartHeight}>
      <ChartBase />
      {projects.map((project, index, array) => {
        const previousRowsCount = array
          .slice(0, index)
          .reduce<number>((acc, current) => acc + current.tasks.length, 0)
        return (
          <ChartRow
            tasks={project.tasks}
            previousRowsCount={previousRowsCount}
          />
        )
      })}
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      {projects.map((project, index, array) => {
        const previousRowsCount = array
          .slice(0, index)
          .reduce<number>((acc, current) => acc + current.tasks.length, 0)
        return getGanttRows(
          project.tasks,
          chartStartDate,
          project.startAt,
          chartEndDate,
          previousRowsCount
        )
      })}
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

function getGanttRows(
  tasks: TaskWithoutTechnicalColmuns[],
  chartStartDate: Date,
  projectStartDate: Date,
  chartEndDate: Date | undefined,
  previousRowsCount: number
): JSX.Element {
  if (!chartEndDate) {
    return <></>
  }

  return (
    <GanttRow
      tasks={tasks}
      chartStartDate={chartStartDate}
      projectStartDate={projectStartDate}
      previousRowsCount={previousRowsCount}
    />
  )
}
