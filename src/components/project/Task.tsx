import { useState } from 'react'
import { NoData } from 'components/common'
import { Check } from 'react-feather'

import { TaskSchema } from 'schema/model/types'

type Props = {
  task: Partial<TaskSchema>
}

export function Task({ task }: Props): JSX.Element {
  const isTapped = false
  const color = isTapped
    ? ' bg-green-700 text-bluegray-100'
    : ' bg-bluegray-300 text-bluegray-200 hover:bg-bluegray-400 active:bg-green-600'
  return (
    <div className="h-20 flex flex-row items-center font-mono text-sm text-center text-bluegray-700 bg-bluegray-200 shadow-sm hover:shadow rounded-xl my-2 px-5 py-2">
      <div className="flex-shrink self-stretch w-2 h-full bg-bluegray-300 rounded-xl"></div>
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${color} cursor-pointer`}
        >
          <Check size={28} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start">
        <span className="truncate text-bluegray-500">
          {task?.project?.name}
        </span>
        <span className="truncate font-bold">{task.name}</span>
      </div>
      <div className="flex-1 flex flex-row items-center justify-evenly">
        <span className="text-bluegray-500 text-sm">planned: </span>
        <span className="text-bluegray-500 text-lg">
          {task.plannedDuration} <span className="text-sm">h</span>
        </span>
      </div>
    </div>
  )
}
