import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjects } from 'pages/'

import { ProjectSchema } from 'schema/model/types'
import { ProjectFormRef } from 'components/project/types'

const updateOneProject = gql`
  mutation(
    $id: Int!
    $name: StringFieldUpdateOperationsInput
    $users: UserUpdateManyWithoutProjectsInput
  ) {
    updateOneProject(where: { id: $id }, data: { name: $name, users: $users }) {
      id
      name
      users {
        id
        name
      }
    }
  }
`

export async function requestUpdateOneProject(
  projectFormRef: ProjectFormRef,
  projects: ProjectSchema[],
  callback?: (...args: any) => void
): Promise<void> {
  const projectForm = projectFormRef.current
  if (projectForm === undefined) {
    throw new Error('form undefined')
  }

  const projectId = projectForm.id

  const targetProject = projects.find((project) => project.id === projectId)
  if (targetProject === undefined) {
    throw new Error('target not found')
  }

  const indexOfTargetProject = projects.findIndex(
    (project) => project.id === projectId
  )

  const newProjects = [...projects]
  newProjects[indexOfTargetProject] = {
    ...targetProject,
    ...formatInputData(projectForm),
  } as ProjectSchema

  mutate(queryAllProjects, { projects: newProjects }, false)
  await request(API, updateOneProject, {
    ...getArgForUpdate(projectForm),
    id: projectId,
  })
  callback && callback()
  mutate(queryAllProjects)
}

interface ProjectInput {
  name: ProjectSchema['name']
  users: {
    id: number
  }[]
}

function formatInputData(
  projectForm: ProjectFormRef['current']
): ProjectInput | undefined {
  if (projectForm === undefined) {
    throw new Error('form undefined')
  }

  return {
    ...projectForm,
    users: projectForm.users.map((user) => ({
      id: user.value,
      name: user.label,
    })),
  }
}

function getArgForUpdate(projectForm: ProjectFormRef['current']) {
  if (projectForm === undefined) {
    throw new Error('form undefined')
  }

  return {
    name: { set: projectForm.name },
    users: {
      set: projectForm.users.map((user) => ({
        id: user.value,
      })),
    },
  }
}
