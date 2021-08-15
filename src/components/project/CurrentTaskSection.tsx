import { useState } from 'react'
import { NoData } from 'components/common'
import { Task } from 'components/project'
import { Plus } from 'react-feather'

import { TaskSchema } from 'schema/model/types'

type Props = {
  currentTask: Partial<TaskSchema> | null
}

export function CurrentTaskSection({ currentTask }: Props): JSX.Element {
  return (
    <section className="lg:h-full bg-gray-100 rounded-3xl overflow-auto px-2 sm:px-4 py-8 lg:py-6">
      <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
        Current Tasks
      </h2>
      {currentTask === null ? (
        <div className="m-10">
          <NoData dataType="tasks" />
        </div>
      ) : (
        <div>
          <Task task={currentTask} />
        </div>
      )}
    </section>
  )
}
