import { MutableRefObject } from 'react'
import { Project, Task, User } from '@prisma/client'

export interface ProjectWithoutTechnicalColmuns
  extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {
  tasks: TaskWithoutTechnicalColmuns[]
  users: UserWithoutTechnicalColmuns[]
}

export type UserWithoutTechnicalColmuns = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt'
>

export interface TaskWithoutTechnicalColmuns
  extends Omit<Task, 'id' | 'createdAt' | 'updatedAt'> {
  project: Project
  user: User
}

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
  rank?: number
  name: string
  plannedDuration: number
  //userUuid: string | undefined
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

//export type TaskComponentProps = Partial<TaskSchema>
