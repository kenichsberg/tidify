import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjectsForTasks } from 'pages/tasks'
import { tasksPerProject } from 'components/task'

import { TaskSchema } from 'schema/model/types'
import { TaskFormRef } from 'components/task/types'

const createOneTask = gql`
  mutation(
    $name: String!
    $status: Status!
    $manHour: Int!
    $startAt: DateTime!
    $endAt: DateTime!
    $manHourResult: Int!
    $startedAt: DateTime
    $endedAt: DateTime
    $user: UserCreateOneWithoutTasksInput!
    $project: ProjectCreateOneWithoutTasksInput!
  ) {
    createOneTask(
      data: {
        name: $name
        status: $status
        manHour: $manHour
        startAt: $startAt
        endAt: $endAt
        manHourResult: $manHourResult
        startedAt: $startedAt
        endedAt: $endedAt
        user: $user
        project: $project
      }
    ) {
      id
      name
    }
  }
`

export async function requestCreateOneTask(
  projectId: number | undefined,
  tasks: TaskSchema[] | undefined = [],
  taskFormRef: TaskFormRef,
  callback?: (...args: any) => void
): Promise<void> {
  if (projectId === undefined) return

  const taskForm = taskFormRef.current
  const newTasks = [
    ...tasks,
    {
      ...formatInputData(taskForm),
      // @ToDo set proper unique id
      id: 999999999,
    },
  ]

  mutate([tasksPerProject, projectId], newTasks, false)
  callback && callback()
  await request(API, createOneTask, getArgForCreate(taskForm))
  mutate(queryAllProjectsForTasks)
}

function formatInputData(taskForm: TaskFormRef['current']) {
  if (taskForm === undefined) return undefined
  return {
    ...taskForm,
    status: taskForm.status?.value,
    startedAt: taskForm.startedAt === '' ? null : taskForm.startedAt,
    endedAt: taskForm.endedAt === '' ? null : taskForm.endedAt,
    user: {
      id: taskForm.user?.value,
    },
  }
}

function getArgForCreate(taskForm: TaskFormRef['current']) {
  if (taskForm === undefined) return undefined
  return {
    ...taskForm,
    status: taskForm.status?.value,
    startedAt: taskForm.startedAt === '' ? null : taskForm.startedAt,
    endedAt: taskForm.endedAt === '' ? null : taskForm.endedAt,
    user: { connect: taskForm.user && { id: taskForm.user.value } },
    project: { connect: taskForm.projectId && { id: taskForm.projectId } },
  }
}
