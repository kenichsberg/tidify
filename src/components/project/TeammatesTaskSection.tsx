import { NoData } from '@/components/common'
import { TeammateTask } from '@/components/project'
import { useTasks } from '@/contexts/task'
import { useUsers, useLoginUser } from '@/contexts/user'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

export function TeammatesTaskSection(): JSX.Element {
  const { state: tasks } = useTasks()
  if (!tasks) throw new Error('context value undefined')

  const { state: users } = useUsers()
  if (!users) throw new Error('context value undefined')

  const { state: loginUser } = useLoginUser()
  if (!loginUser) throw new Error('context value undefined')

  const usernameToTasks = tasks
    .filter(
      (task) => task.user.uuid !== loginUser.uuid && task.status !== 'DONE'
    )
    .reduce<any>(
      (acc, current) => ({
        ...acc,
        [current.user.uuid]: acc?.[current.user.uuid]
          ? [...acc[current.user.uuid], current]
          : [current],
      }),
      {}
    )

  const userNames = Object.keys(usernameToTasks)
  let teammateTasks: TaskWithoutTechnicalColmuns[] = []

  userNames.forEach((userName) => {
    const tasks = [...usernameToTasks[userName]]
    tasks.sort((a, b) => a.rank - b.rank)
    teammateTasks = tasks?.[0] ? [...teammateTasks, tasks?.[0]] : teammateTasks
  })

  return (
    <section className="bg-gradient-to-b from-bluegray-50 to-bluegray-100 rounded-[60px] overflow-auto px-4 sm:px-6 py-10 transition shadow hover:shadow-2xl">
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
