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
  duration: number
  user: string
}

export interface TaskProps {
  task: TaskFormProps
}

export interface CreateProjectFormProps {
  name: string
  startAt: string
}

export interface AssignTasksFormProps {
  [prop: string]: string | number
}

export type TaskComponentProps = Partial<TaskSchema>
