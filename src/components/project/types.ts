import { MutableRefObject } from 'react'
import { Project, Task, User } from '@prisma/client'

import { TaskSchema } from 'schema/model/types'

export interface ProjectWithoutTechnicalColmuns
  extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {
  tasks: Task[]
  users: User[]
}

export type UserWithoutTechnicalColmuns = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt'
>

export type TaskWithoutTechnicalColmuns = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt'
>

export interface ProjectForm {
  uuid: string
  name: string
  users: {
    value: User['id']
    label: User['name']
  }[]
}

export type ProjectFormRef = MutableRefObject<ProjectForm | undefined>

export type ProjectStatus = 'completed' | 'ahead' | 'late'

export interface TaskFormProps {
  uuid: string
  name: string
  plannedDuration: number
  userId: number | undefined
}

export interface TaskProps {
  task: TaskFormProps
}

export interface CreateProjectFormProps {
  uuid: string
  name: string
  startAt: Date
}

export interface AssignTasksFormProps {
  tasks: {
    uuid: string
    rank: number
    name: string
    plannedDuration: number
    userId: number | undefined
    isDummy: boolean
  }[]
}

export type TaskComponentProps = Partial<TaskSchema>
