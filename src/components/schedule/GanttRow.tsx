import { useCache } from 'hooks/index'
import { diffDate } from 'utils/date'

import { TaskSchema } from 'schema/model/types'

type Props = {
  tasks: Partial<TaskSchema>[]
  chartStartDate: Date
  projectStartDate: Date
}

export function GanttRow({ tasks, chartStartDate, projectStartDate }: Props) {
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')
  const { data: _columnWidth } = useCache<number>('columnWidth')

  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0
  const columnWidth = _columnWidth ?? 0

  const planGanttOffsetY = (rowHeight - PLAN_GANTT_HEIGHT) / 2
  const resultGanttOffsetY = rowHeight - planGanttOffsetY - RESULT_GANTT_HEIGHT
  const getGanttRowWidth = getFuncGanttRowWidth(columnWidth)

  let tmpEndAt: Date | undefined
  let tmpEndedAt: Date | undefined
  const workPerDay = 8
  const totalPerDay = 24
  const ratio = totalPerDay / workPerDay

  return (
    <g>
      {tasks.map((task, index) => {
        // 1st time --> startAt = project.startAt
        // from 2nd time --> startAt = endAt of predecessor task
        const startAt = tmpEndAt ?? projectStartDate
        const endAt = addHours(startAt, (task.plannedDuration ?? 0) * ratio)
        //console.log(startAt, endAt)
        tmpEndAt = endAt

        const planGanttOffsetX = getGanttRowWidth(chartStartDate, startAt)
        const planWidth = getGanttRowWidth(startAt, endAt)
        const planGanttColor =
          index % 2 === 0 ? ' text-blue-300' : ' text-emerald-300'

        const startedAt = tmpEndedAt ?? projectStartDate
        const endedAt = addHours(startedAt, (task.actualDuration ?? 0) * ratio)
        tmpEndedAt = endedAt

        const resultGanttOffsetX = getGanttRowWidth(chartStartDate, startedAt)
        const resultWidth = getGanttRowWidth(startedAt, endedAt)
        const resultGanttColor =
          index % 2 === 0 ? ' text-blue-700' : ' text-emerald-700'

        return (
          <g key={task.id}>
            <rect
              className={`fill-current ${planGanttColor}`}
              x={planGanttOffsetX}
              y={headerHeight + rowHeight * index + planGanttOffsetY}
              rx="5"
              ry="5"
              width={planWidth}
              height={PLAN_GANTT_HEIGHT}
              stroke="#e0e0e0"
              fillOpacity="60%"
            ></rect>
            <rect
              className={`fill-current ${resultGanttColor}`}
              x={resultGanttOffsetX}
              y={headerHeight + rowHeight * index + resultGanttOffsetY}
              rx="5"
              ry="5"
              width={resultWidth}
              height={RESULT_GANTT_HEIGHT}
              //stroke="#e0e0e0"
              fillOpacity="80%"
            ></rect>
          </g>
        )
      })}
    </g>
  )
}

const PLAN_GANTT_HEIGHT = 40
const RESULT_GANTT_HEIGHT = 20

function addHours(_date: Date, hours: number): Date {
  const date = new Date(_date.getTime())
  date.setHours(date.getHours() + hours)
  return date
}

function getFuncGanttRowWidth(columnWidth: number) {
  return function (startDatetime: Date, endDatetime: Date): number {
    const diffDays = diffDate(startDatetime, endDatetime, 'day')
    return diffDays * columnWidth
  }
}
