import { useCache } from 'hooks/index'
import { RoundRect } from './'

import { TaskSchema } from 'schema/model/types'

type Props = {
  tasks: Partial<TaskSchema>[]
}

export function ChartRow({ tasks }: Props): JSX.Element {
  const { data: _ganttFieldWidth } = useCache<number>('ganttFieldWidth')
  const { data: _chartHeight } = useCache<number>('chartHeight')
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')

  const ganttFieldWidth = _ganttFieldWidth ?? 0
  const chartHeight = _chartHeight ?? 0
  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0

  return (
    <g>
      <RoundRect
        className="fill-current text-gray-50"
        isRoundCorners={{
          leftTop: false,
          leftBottom: false,
          rightTop: true,
          rightBottom: true,
        }}
        rectProps={{
          x: 0,
          y: 0,
          width: ganttFieldWidth ?? 0,
          height: chartHeight ?? 0,
          radius: 20,
        }}
      />
      {tasks.map((task, index) => {
        const color = index % 2 === 0 ? ' text-bluegray-100' : ' text-gray-50'
        return (
          <rect
            className={`fill-current${color}`}
            key={task.id}
            x="0"
            y={rowHeight * index + (headerHeight ?? 0)}
            width={ganttFieldWidth}
            height={rowHeight}
          ></rect>
        )
      })}
    </g>
  )
}
