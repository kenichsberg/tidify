import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjectsForTasks } from 'pages/tasks'
import { tasksPerProject } from 'components/task'

import { TaskSchema } from 'schema/model/types'
import { TaskFormRef } from 'components/task/types'

const updateOneTask = gql`
  mutation(
    $id: Int!
    $name: StringFieldUpdateOperationsInput
    $status: EnumStatusFieldUpdateOperationsInput
    $manHour: IntFieldUpdateOperationsInput
    $startAt: DateTimeFieldUpdateOperationsInput
    $endAt: DateTimeFieldUpdateOperationsInput
    $manHourResult: IntFieldUpdateOperationsInput
    $startedAt: NullableDateTimeFieldUpdateOperationsInput
    $endedAt: NullableDateTimeFieldUpdateOperationsInput
    $user: UserUpdateOneRequiredWithoutTasksInput
  ) {
    updateOneTask(
      where: { id: $id }
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
      }
    ) {
      id
      name
    }
  }
`

export async function requestUpdateOneTask(
  taskId: number | undefined,
  projectId: number | undefined,
  tasks: TaskSchema[] | undefined,
  taskFormRef: TaskFormRef,
  callback?: (...args: any) => void
): Promise<void> {
  if (taskId === undefined) return
  if (projectId === undefined) return
  if (tasks === undefined) return

  const targetTask = tasks.find((task) => task.id === taskId)
  const indexOfTargetTask = tasks.findIndex((task) => task.id === taskId)
  const taskForm = taskFormRef.current
  const newTasks = [...tasks]
  newTasks[indexOfTargetTask] = {
    ...targetTask,
    ...formatInputData(taskForm),
  } as TaskSchema

  mutate([tasksPerProject, projectId], newTasks, false)
  await request(API, updateOneTask, {
    ...getArgForUpdateConnect(taskForm),
    ...{ id: taskId },
  })
  mutate(queryAllProjectsForTasks)
  callback && callback()
}

interface TaskInput {
  status: TaskSchema['status'] | undefined
  startedAt: TaskSchema['startedAt']
  endedAt: TaskSchema['endedAt']
  user: {
    id: number | undefined
  }
}

function formatInputData(
  taskForm: TaskFormRef['current']
): TaskInput | undefined {
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

function getArgForUpdateConnect(taskForm: TaskFormRef['current']) {
  if (taskForm === undefined) return undefined
  return {
    name: { set: taskForm.name },
    status: { set: taskForm.status?.value },
    manHour: { set: taskForm.manHour },
    startAt: { set: taskForm.startAt },
    endAt: { set: taskForm.endAt },
    manHourResult: { set: taskForm.manHourResult },
    startedAt: { set: taskForm.startedAt === '' ? null : taskForm.startedAt },
    endedAt: { set: taskForm.endedAt === '' ? null : taskForm.endedAt },
    user: { connect: taskForm.user && { id: taskForm.user.value } },
  }
}
