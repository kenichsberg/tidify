import { MutableRefObject } from 'react'

import { TaskSchema } from 'schema/model/types'

export interface TaskForm {
  name: string
  status: { value: TaskSchema['status'] } | undefined
  manHour: number | undefined
  startAt: ''
  endAt: ''
  manHourResult: number | undefined
  startedAt: ''
  endedAt: ''
  user:
    | {
        value: TaskSchema['user']['id']
      }
    | undefined
  projectId: number | undefined
}

export type TaskFormRef = MutableRefObject<TaskForm | undefined>
