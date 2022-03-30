import { useCache } from '@/hooks/index'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  tasks: TaskWithoutTechnicalColmuns[]
  previousRowsCount: number
}

export function ChartRow({ tasks, previousRowsCount }: Props): JSX.Element {
  const { data: _ganttFieldWidth } = useCache<number>('ganttFieldWidth')
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')

  const ganttFieldWidth = _ganttFieldWidth ?? 0
  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0

  const offsetY = previousRowsCount * rowHeight

  return (
    <g>
      {tasks.map((task, index) => {
        const color =
          (previousRowsCount + index) % 2 === 0
            ? ' fill-bluegray-100'
            : ' fill-gray-50'
        return (
          <rect
            className={`${color}`}
            key={task.uuid}
            x="0"
            y={offsetY + rowHeight * index + (headerHeight ?? 0)}
            width={ganttFieldWidth}
            height={rowHeight}
          ></rect>
        )
      })}
    </g>
  )
}
