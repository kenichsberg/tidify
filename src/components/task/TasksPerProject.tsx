import { FC, useEffect } from 'react'
import { gql } from 'graphql-request'
import { ChevronUp } from 'react-feather'
import { useCache } from 'hooks/index'
import { TaskRow } from 'components/task'
import { TaskSchema, UserSchema } from 'schema/model/types'

type Props = {
  _tasks: TaskSchema[] | undefined
  users: UserSchema[]
  projectId: number
  projectName: string
}

export const tasksPerProject = gql`
  query {
    tasks(orderBy: { id: asc }) {
      id
      name
      status
      manHour
      startAt
      endAt
      manHourResult
      startedAt
      endedAt
      user {
        id
        name
      }
      projectId
    }
  }
`

export const usersPerProject = gql`
  query {
    users(orderBy: { id: asc }) {
      id
      name
      email
      role
    }
  }
`

export const TasksPerProject: FC<Props> = ({
  _tasks,
  users,
  projectId,
  projectName,
}) => {
  const { data: cachedTasks, mutate: setCachedTasks } = useCache<TaskSchema[]>(
    [tasksPerProject, projectId],
    _tasks ?? []
  )

  useCache<UserSchema[]>([usersPerProject, projectId], users ?? [])

  useEffect(() => {
    setCachedTasks(_tasks ?? [])
  }, [_tasks])

  const tasks = cachedTasks?.length ? cachedTasks : _tasks

  return (
    <div className="bg-bluegray-200 shadow rounded-3xl my-3 px-5 pt-4 pb-6">
      <div className="flex font-mono text-bluegray-700 font-bold pl-5 py-3">
        <span className="flex-grow text-lg">{projectName}</span>
        <div className="transform flex-shrink hover:scale-125 hover:text-bluegray-500 w-14 text-center cursor-pointer">
          <button>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
      <div className="py-2">
        {tasks?.map((task, index) => (
          <TaskRow
            key={task.id}
            task={task}
            users={users}
            projectId={projectId}
            index={index}
          />
        ))}
        <TaskRow task={null} users={users} projectId={projectId} index={null} />
      </div>
    </div>
  )
}
