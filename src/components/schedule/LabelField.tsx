import { RoundRect } from '@/components/schedule'
import { useCache } from '@/hooks/index'

import {
  TaskWithoutTechnicalColmuns,
  UserWithoutTechnicalColmuns,
} from '@/components/project/types'

type Props = {
  tasks: Partial<
    TaskWithoutTechnicalColmuns & { user: UserWithoutTechnicalColmuns }
  >[]
  projectName: string
}

export function LabelField({ tasks, projectName }: Props): JSX.Element {
  const { data: _chartHeight } = useCache<number>('chartHeight')
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')

  const chartHeight = _chartHeight ?? 0
  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0

  return (
    <svg width={LABEL_FIELD_WIDTH} height={chartHeight}>
      <g>
        <RoundRect
          className="fill-gray-50"
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
        <text
          className="fill-gray-700 font-bold"
          x={TEXT_OFFSET_X}
          y={PROJECT_TEXT_OFFSET_Y}
          fontSize="16px"
        >
          {projectName}
        </text>
      </g>
      {tasks.map((task, index) => {
        console.log(task)
        const color = index % 2 === 0 ? ' fill-bluegray-100' : ' fill-gray-50'
        /*
        const projectTextColor =
          index % 2 === 0 ? ' text-bluegray-400' : ' text-gray-400'
         */
        const taskTextColor =
          index % 2 === 0 ? ' fill-bluegray-600' : ' fill-gray-600'
        const userTextColor =
          index % 2 === 0 ? ' fill-bluegray-400' : ' fill-gray-400'

        return (
          <g key={task.uuid}>
            <rect
              className={`${color}`}
              key={task.uuid}
              x="0"
              y={headerHeight + rowHeight * index}
              width={LABEL_FIELD_WIDTH}
              height={rowHeight}
            ></rect>
            {/*
            <text
              className={`fill-current${projectTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + PROJECT_TEXT_OFFSET_Y}
              fontSize="14px"
            >
              {
                //task.project.name
              }
              {projectName}
            </text>
*/}
            <text
              className={`${taskTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + TASK_TEXT_OFFSET_Y}
            >
              {task.name}
            </text>
            <text
              className={`${userTextColor}`}
              x={TEXT_OFFSET_X}
              y={headerHeight + rowHeight * index + USER_TEXT_OFFSET_Y}
              fontSize="14px"
            >
              {`@${task.user?.name}`}
            </text>
          </g>
        )
      })}
      <g>
        <RoundRect
          className="stroke-gray-200"
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

const TEXT_OFFSET_X = 15
//const PROJECT_TEXT_OFFSET_Y = 20
//const TASK_TEXT_OFFSET_Y = 45
//const USER_TEXT_OFFSET_Y = 65
const PROJECT_TEXT_OFFSET_Y = 30
const TASK_TEXT_OFFSET_Y = 35
const USER_TEXT_OFFSET_Y = 55
