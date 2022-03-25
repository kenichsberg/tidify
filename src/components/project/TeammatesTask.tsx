import { User } from 'react-feather'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  task: TaskWithoutTechnicalColmuns
  index?: number
}

export function TeammateTask({ task, index = 0 }: Props): JSX.Element {
  const isTapped = false
  const color = isTapped
    ? ' bg-green-700 text-bluegray-100'
    : ' bg-bluegray-300 text-bluegray-200 hover:bg-bluegray-400 active:bg-green-600'
  return (
    <div
      className="h-20 flex flex-row justify-between items-center font-mono text-sm text-center text-bluegray-700 bg-gradient-to-br from-bluegray-100/90 to-bluegray-200 shadow rounded-xl my-2 px-5 py-2 transition-all duration-500 animate-slide-x hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
      style={{ animationDelay: `${0.2 * (index + 1)}s` }}
    >
      <div className="flex-shrink self-stretch w-2 h-full bg-bluegray-300 rounded-xl"></div>
      <div className="w-[20%] flex flex-col items-center">
        <div
          className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${color} cursor-pointer`}
        >
          <User size={18} />
        </div>
      </div>
      <div className="w-1/2 max-w-[20rem] flex-1 flex flex-col items-start">
        <div className="block w-4/5">
          <p className="truncate text-bluegray-500">{task.project?.name}</p>
          <p className="truncate font-bold">{task.name}</p>
        </div>
      </div>
      <div className="w-[30%] self-stretch flex flex-col items-center">
        <div className="flex-1 flex flex-row items-center">
          <span className="text-bluegray-500 text-xs">planned: </span>
          <span className="text-bluegray-500 text-sm pl-2">
            {task.plannedDuration} <span className="text-xs">h</span>
          </span>
        </div>
        <div className="flex-1 flex flex-row items-center">
          <span className="text-bluegray-500 text-xs">actual : </span>
          <span className="text-bluegray-500 text-sm pl-2">
            {task.actualDuration} <span className="text-xs">h</span>
          </span>
        </div>
      </div>
    </div>
  )
}
