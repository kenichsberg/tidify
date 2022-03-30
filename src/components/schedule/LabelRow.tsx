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
  previousRowsCount: number
}

export function LabelRow({
  tasks,
  projectName,
  previousRowsCount,
}: Props): JSX.Element {
  const { data: _headerHeight } = useCache<number>('headerHeight')
  const { data: _rowHeight } = useCache<number>('rowHeight')

  const headerHeight = _headerHeight ?? 0
  const rowHeight = _rowHeight ?? 0

  const offsetY = previousRowsCount * rowHeight

  return (
    <>
      {tasks.map((task, index) => {
        console.log(task)
        const color =
          (previousRowsCount + index) % 2 === 0
            ? ' fill-bluegray-100'
            : ' fill-gray-50'

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
              y={offsetY + headerHeight + rowHeight * index}
              width={LABEL_FIELD_WIDTH}
              height={rowHeight}
            ></rect>
            <text
              className={`${userTextColor}`}
              x={TEXT_OFFSET_X}
              y={
                offsetY +
                headerHeight +
                rowHeight * index +
                PROJECT_TEXT_OFFSET_Y
              }
              fontSize="10px"
            >
              {projectName}
            </text>
            <text
              className={`${taskTextColor}`}
              x={TEXT_OFFSET_X}
              y={
                offsetY + headerHeight + rowHeight * index + TASK_TEXT_OFFSET_Y
              }
            >
              {task.name}
            </text>
            <text
              className={`${userTextColor}`}
              x={TEXT_OFFSET_X}
              y={
                offsetY + headerHeight + rowHeight * index + USER_TEXT_OFFSET_Y
              }
              fontSize="12px"
            >
              {`@${task.user?.name}`}
            </text>
          </g>
        )
      })}
    </>
  )
}

const LABEL_FIELD_WIDTH = 250

const TEXT_OFFSET_X = 15
//const TASK_TEXT_OFFSET_Y = 35
//const USER_TEXT_OFFSET_Y = 55
const PROJECT_TEXT_OFFSET_Y = 25
const TASK_TEXT_OFFSET_Y = 45
const USER_TEXT_OFFSET_Y = 62
