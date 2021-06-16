import { FC } from 'react'
import { useCache } from 'hooks/index'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'
import { getGrossDays } from 'utils/date'

type Props = {
  tasks: NexusGenFieldTypes['Task'][]
  chartStartDate: Date
}

export const GanttRow: FC<Props> = ({ tasks, chartStartDate }) => {
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')
  const { data: _columnWidth } = useCache<number>('columnWidth')

  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0
  const columnWidth = _columnWidth ?? 0

  const planGanttOffsetY = (rowHeight - PLAN_GANTT_HEIGHT) / 2
  const resultGanttOffsetY = rowHeight - planGanttOffsetY - RESULT_GANTT_HEIGHT
  const getGanttRowWidth = getFuncGanttRowWidth(columnWidth)

  return (
    <g>
      {tasks.map((task, index) => {
        const startAt = new Date(task.startAt)
        const endAt = new Date(task.endAt)
        const planGanttOffsetX = getGanttRowWidth(chartStartDate, startAt)
        const planWidth = getGanttRowWidth(startAt, endAt)
        const planGanttColor =
          index % 2 === 0 ? ' text-blue-300' : ' text-emerald-300'
        console.log(chartStartDate, startAt, planGanttOffsetX, planWidth)

        const startedAt = new Date(task.startedAt)
        const endedAt = new Date(task.endedAt)
        const resultGanttOffsetX = getGanttRowWidth(chartStartDate, startedAt)
        const resultWidth = getGanttRowWidth(startedAt, endedAt)
        const resultGanttColor =
          index % 2 === 0 ? ' text-blue-700' : ' text-emerald-700'
        console.log(chartStartDate, startedAt, resultGanttOffsetX, resultWidth)

        return (
          <g key={task.id}>
            <rect
              className={`fill-current${planGanttColor}`}
              x={planGanttOffsetX}
              y={headerHeight + rowHeight * index + planGanttOffsetY}
              rx="5"
              ry="5"
              width={planWidth}
              height={PLAN_GANTT_HEIGHT}
              stroke="#e0e0e0"
              fillOpacity="50%"
            ></rect>
            <rect
              className={`fill-current${resultGanttColor}`}
              x={resultGanttOffsetX}
              y={headerHeight + rowHeight * index + resultGanttOffsetY}
              rx="5"
              ry="5"
              width={resultWidth}
              height={RESULT_GANTT_HEIGHT}
              //stroke="#e0e0e0"
              fillOpacity="50%"
            ></rect>
          </g>
        )
      })}
    </g>
  )
}

const getFuncGanttRowWidth = (columnWidth: number) => (
  startDatetime: Date,
  endDatetime: Date
): number => {
  const diffDays = getGrossDays(startDatetime, endDatetime)
  return diffDays * columnWidth
}

const PLAN_GANTT_HEIGHT = 40
const RESULT_GANTT_HEIGHT = 20
