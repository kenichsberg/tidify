import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjectsForTasks } from 'pages/tasks'
import { tasksPerProject } from 'components/task'

import { TaskSchema } from 'schema/model/types'

const deleteOneTask = gql`
  mutation($id: Int!) {
    deleteOneTask(where: { id: $id }) {
      id
      name
    }
  }
`

export async function requestDeleteOneTask(
  taskId: number | undefined,
  projectId: number | undefined,
  tasks: TaskSchema[] | undefined
): Promise<void> {
  if (taskId === undefined) {
    throw new Error('target not found')
  }

  const otherTasks = tasks?.filter((task) => task.id !== taskId) ?? []
  mutate([tasksPerProject, projectId], otherTasks, false)
  await request(API, deleteOneTask, { id: taskId })
  mutate(queryAllProjectsForTasks)
}
