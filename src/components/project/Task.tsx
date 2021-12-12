import { Clock, RefreshCw } from 'react-feather'

import { TaskComponentProps } from '@/components/project/types'

type Props = {
  task: TaskComponentProps
}

export function Task({ task }: Props): JSX.Element {
  const isTapped = false
  const color = isTapped
    ? ' bg-green-700 text-bluegray-100'
    : ' bg-bluegray-300 text-bluegray-200 hover:bg-bluegray-400 active:bg-green-600'
  return (
    <div className="h-20 flex flex-row justify-between items-center font-mono text-sm text-center text-bluegray-700 bg-bluegray-200 shadow-sm hover:shadow rounded-xl my-2 px-5 py-2">
      <div className="flex-shrink self-stretch w-2 h-full bg-bluegray-300 rounded-xl"></div>
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${color} cursor-pointer`}
        >
          <Clock size={18} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start">
        <span className="truncate text-bluegray-500">{task.project?.name}</span>
        <span className="truncate font-bold">{task.name}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${color} cursor-pointer`}
        >
          <RefreshCw className="transform rotate-90" size={18} />
        </div>
      </div>
      <div className="flex-1 self-stretch flex flex-col items-center">
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
