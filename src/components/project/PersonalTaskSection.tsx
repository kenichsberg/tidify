import { NoData } from '@/components/common'
import { Task } from '@/components/project'

import { TaskComponentProps } from '@/components/project/types'

type Props = {
  task: TaskComponentProps | undefined
}

export function PersonalTaskSection({ task }: Props): JSX.Element {
  return (
    <section className="lg:h-full bg-gray-100 rounded-3xl overflow-auto px-2 sm:px-4 py-8 lg:py-6">
      <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
        Your Current Tasks
      </h2>
      {getTask(task)}
    </section>
  )
}

function getTask(task: TaskComponentProps | undefined): JSX.Element {
  if (task === undefined) {
    return (
      <div className="m-10">
        <NoData dataType="tasks" />
      </div>
    )
  } else {
    return (
      <div>
        <Task task={task} />
      </div>
    )
  }
}
