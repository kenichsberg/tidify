import { useCache } from '@/hooks/index'
import { ManHourCalculator } from '@/utils/date'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  tasks: TaskWithoutTechnicalColmuns[]
  chartStartDate: Date
  projectStartDate: Date
  previousRowsCount: number
}

export function GanttRow({
  tasks,
  chartStartDate,
  projectStartDate,
  previousRowsCount,
}: Props) {
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')
  const { data: _columnWidth } = useCache<number>('columnWidth')

  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0
  const columnWidth = _columnWidth ?? 0

  const offsetY = previousRowsCount * rowHeight

  const planGanttOffsetY = (rowHeight - PLAN_GANTT_HEIGHT) / 2
  const resultGanttOffsetY = rowHeight - planGanttOffsetY - RESULT_GANTT_HEIGHT

  tasks.sort((a, b) => a.rank - b.rank)

  let tmpEndAt: Date | undefined
  let tmpEndedAt: Date | undefined
  const calc = new ManHourCalculator()

  return (
    <g>
      {tasks.map((task, index) => {
        // 1st task --> startAt = project.startAt
        // from 2nd task --> startAt = endAt of predecessor task
        const startAt = tmpEndAt ?? projectStartDate
        const endAt = calc.getEndDatetimeByManHour(
          startAt,
          task.plannedDuration
        )
        tmpEndAt = endAt

        const planGanttOffsetX =
          calc.getGrossDurationDays(chartStartDate, startAt) * columnWidth
        const planWidth =
          calc.getGrossDurationDays(startAt, endAt) * columnWidth
        const planGanttColor =
          (previousRowsCount + index) % 2 === 0
            ? ' fill-blue-300'
            : ' fill-emerald-300'

        const startedAt = tmpEndedAt ?? projectStartDate
        const endedAt = calc.getEndDatetimeByManHour(
          startedAt,
          task.actualDuration ?? 0
        )
        tmpEndedAt = endedAt

        const resultGanttOffsetX =
          calc.getGrossDurationDays(chartStartDate, startedAt) * columnWidth
        const resultWidth =
          calc.getGrossDurationDays(startedAt, endedAt) * columnWidth
        const resultGanttColor =
          (previousRowsCount + index) % 2 === 0
            ? ' fill-blue-700'
            : ' fill-emerald-700'

        return (
          <g key={task.uuid}>
            <rect
              className={`${planGanttColor} transition-all duration-100 animate-slide-x hover:stroke-bluegray-800`}
              x={planGanttOffsetX}
              y={offsetY + headerHeight + rowHeight * index + planGanttOffsetY}
              rx="5"
              ry="5"
              width={planWidth}
              height={PLAN_GANTT_HEIGHT}
              stroke="#e0e0e0"
              fillOpacity="60%"
              style={{
                animationDelay: `${0.18 * (previousRowsCount + index)}s`,
              }}
            ></rect>
            <rect
              className={`${resultGanttColor} transition-all duration-100 animate-slide-x hover:stroke-bluegray-800`}
              x={resultGanttOffsetX}
              y={
                offsetY + headerHeight + rowHeight * index + resultGanttOffsetY
              }
              rx="5"
              ry="5"
              width={resultWidth}
              height={RESULT_GANTT_HEIGHT}
              fillOpacity="80%"
              style={{
                animationDelay: `${0.18 * (previousRowsCount + index) + 0.12}s`,
              }}
            ></rect>
          </g>
        )
      })}
    </g>
  )
}

const PLAN_GANTT_HEIGHT = 40
const RESULT_GANTT_HEIGHT = 20
