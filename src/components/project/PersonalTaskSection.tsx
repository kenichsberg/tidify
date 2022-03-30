import { NoData } from '@/components/common'
import { PersonalTask } from '@/components/project'
import { useTasks } from '@/contexts/task'
import { useLoginUser } from '@/contexts/user'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

export function PersonalTaskSection(): JSX.Element {
  const { state: tasks } = useTasks()
  if (!tasks) throw new Error('context value undefined')

  const { state: loginUser } = useLoginUser()
  if (!loginUser) throw new Error('context value undefined')

  const personalTask = tasks.filter(
    (task) => task.user.uuid === loginUser.uuid && task.status !== 'DONE'
  )?.[0]

  return (
    <section className="lg:h-full bg-gradient-to-b from-bluegray-50 via-bluegray-50 to-bluegray-100 rounded-[60px] overflow-auto px-4 sm:px-6 py-10">
      <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
        Your Current Tasks
      </h2>
      {getTask(personalTask)}
    </section>
  )
}

function getTask(task: TaskWithoutTechnicalColmuns | undefined): JSX.Element {
  if (task === undefined) {
    return (
      <div className="m-10">
        <NoData dataType="tasks" />
      </div>
    )
  } else {
    return (
      <div>
        <PersonalTask task={task} />
      </div>
    )
  }
}
