import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjects } from 'pages/'

import { ProjectSchema } from 'schema/model/types'
import { ProjectFormRef } from 'components/project/types'

const createOneProject = gql`
  mutation($name: String!, $users: UserCreateManyWithoutProjectsInput) {
    createOneProject(data: { name: $name, users: $users }) {
      id
      name
      users {
        id
        name
      }
    }
  }
`

export async function requestCreateOneProject(
  projectFormRef: ProjectFormRef,
  projects: ProjectSchema[],
  callback?: (...args: any) => void
): Promise<void> {
  const projectForm = projectFormRef.current
  if (projectForm === undefined) {
    throw new Error('form undefined')
  }

  const newProjects = [
    ...projects,
    {
      ...formatInputData(projectForm),
      // @ToDo set proper unique id
      id: 999999999,
    },
  ]

  mutate(queryAllProjects, { projects: newProjects }, false)
  callback && callback()
  await request(API, createOneProject, {
    ...getArgForCreate(projectForm),
    id: 999999999,
  })
  mutate(queryAllProjects)
}

function formatInputData(projectForm: ProjectFormRef['current']) {
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

function getArgForCreate(projectForm: ProjectFormRef['current']) {
  if (projectForm === undefined) {
    throw new Error('form undefined')
  }

  return {
    name: projectForm.name,
    users: {
      connect: projectForm.users.map((user) => ({
        id: user.value,
      })),
    },
  }
}
