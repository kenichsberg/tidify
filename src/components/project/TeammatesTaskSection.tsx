import { NoData } from '@/components/common'
import { TeammateTask } from '@/components/project'
import { useTasks } from '@/contexts/task'
import { useLoginUser } from '@/contexts/user'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

export function TeammatesTaskSection(): JSX.Element {
  const { state: tasks } = useTasks()
  if (!tasks) throw new Error('context value undefined')

  const { state: loginUser } = useLoginUser()
  if (!loginUser) throw new Error('context value undefined')

  const teammateTasks =
    tasks.filter((task) => task.user.uuid !== loginUser.uuid) ?? []

  return (
    <section className="bg-gradient-to-b from-bluegray-50 to-bluegray-100 rounded-[60px] overflow-auto px-4 sm:px-6 py-10">
      <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
        Teammates' Tasks
      </h2>
      {getTasks(teammateTasks)}
    </section>
  )
}

function getTasks(tasks: TaskWithoutTechnicalColmuns[]): JSX.Element {
  if (!tasks.length) {
    return (
      <div className="m-10">
        <NoData dataType="tasks" />
      </div>
    )
  }

  const tasksVDom = tasks.map((task, index) => (
    <div key={task.uuid}>
      <TeammateTask task={task} index={index} />
    </div>
  ))
  return <>{tasksVDom}</>
}
