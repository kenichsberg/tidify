import { MutableRefObject } from 'react'

import { TaskSchema } from 'schema/model/types'

export interface ProjectForm {
  id: number
  name: string
  users: {
    value: TaskSchema['user']['id']
    label: TaskSchema['user']['name']
  }[]
}

export type ProjectFormRef = MutableRefObject<ProjectForm | undefined>

export type ProjectStatus = 'completed' | 'ahead' | 'late'
