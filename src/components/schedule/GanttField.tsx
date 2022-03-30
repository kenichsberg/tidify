import { useCache } from '@/hooks/index'
import { diffDate } from '@/utils/date'
import {
  ChartBase,
  ChartRow,
  ChartColumn,
  GanttRow,
} from '@/components/schedule'
import { useProjects } from '@/contexts/project'

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
            key={project.uuid}
            tasks={project.tasks}
            previousRowsCount={previousRowsCount}
          />
        )
      })}
      <ChartColumn weekCount={weekCount} chartStartDate={chartStartDate} />
      {projects.map((project, index, array) => {
        if (!chartEndDate) {
          return <></>
        }

        const previousRowsCount = array
          .slice(0, index)
          .reduce<number>((acc, current) => acc + current.tasks.length, 0)

        return (
          <GanttRow
            key={project.uuid}
            tasks={project.tasks}
            chartStartDate={chartStartDate}
            projectStartDate={project.startAt}
            previousRowsCount={previousRowsCount}
          />
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
