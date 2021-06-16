import { FC } from 'react'
import { useCache } from 'hooks/index'
import { RoundRect } from './'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'

type Props = {
  tasks: NexusGenFieldTypes['Task'][]
}

export const LabelField: FC<Props> = ({ tasks }) => {
  const { data: _chartHeight } = useCache<number>('chartHeight')
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')

  const chartHeight = _chartHeight ?? 0
  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0

  return (
    <svg width={LABEL_FIELD_WIDTH} height={LABEL_FIELD_HEIGHT}>
      <g>
        <RoundRect
          className="fill-current text-gray-50"
          isRoundCorners={{
            leftTop: true,
            leftBottom: true,
            rightTop: false,
            rightBottom: false,
          }}
          rectProps={{
            x: 0,
            y: 0,
            width: LABEL_FIELD_WIDTH,
            height: chartHeight,
            radius: 20,
          }}
        />
      </g>
      {tasks.map((task, index) => {
        const color = index % 2 === 0 ? ' text-bluegray-100' : ' text-gray-50'
        const projectTextColor =
          index % 2 === 0 ? ' text-bluegray-400' : ' text-gray-400'
        const taskTextColor =
          index % 2 === 0 ? ' text-bluegray-600' : ' text-gray-600'
        const userTextColor =
          index % 2 === 0 ? ' text-bluegray-400' : ' text-gray-400'

        return (
          <g key={task.id}>
            <rect
              className={`fill-current${color}`}
              key={task.id}
              x="0"
              y={headerHeight + rowHeight * index}
              width={LABEL_FIELD_WIDTH}
              height={rowHeight}
            ></rect>
            <text
              className={`fill-current${projectTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + PROJECT_TEXT_OFFSET_Y}
              fontSize="14px"
            >
              {task.project.name}
            </text>
            <text
              className={`fill-current${taskTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + TASK_TEXT_OFFSET_Y}
            >
              {task.name}
            </text>
            <text
              className={`fill-current${userTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + USER_TEXT_OFFSET_Y}
              fontSize="14px"
            >
              {`@${task.user.name}`}
            </text>
          </g>
        )
      })}
      <g>
        <RoundRect
          className="stroke-current text-gray-200"
          isRoundCorners={{
            leftTop: true,
            leftBottom: true,
            rightTop: false,
            rightBottom: false,
          }}
          rectProps={{
            x: 0,
            y: 0,
            width: LABEL_FIELD_WIDTH,
            height: chartHeight,
            radius: 20,
          }}
          fillOpacity="0%"
        />
      </g>
    </svg>
  )
}

const LABEL_FIELD_WIDTH = 250
const LABEL_FIELD_HEIGHT = 800

const TEXT_OFFSET_X = 15
const PROJECT_TEXT_OFFSET_Y = 20
const TASK_TEXT_OFFSET_Y = 45
const USER_TEXT_OFFSET_Y = 65
