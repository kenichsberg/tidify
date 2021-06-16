import { mutate } from 'swr'
import { request, gql } from 'graphql-request'
import { API } from 'core/client'
import { queryAllProjects } from 'pages/'

import { ProjectSchema } from 'schema/model/types'

const deleteOneProject = gql`
  mutation($id: Int!) {
    deleteOneProject(where: { id: $id }) {
      id
      name
    }
  }
`

export async function requestDeleteOneProject(
  projectId: number | undefined,
  projects: ProjectSchema[]
): Promise<void> {
  if (projectId === undefined) {
    throw new Error('target not found')
  }

  const otherProjects = projects.filter((project) => project.id !== projectId)
  mutate(queryAllProjects, { projects: otherProjects }, false)
  await request(API, deleteOneProject, { id: projectId })
  mutate(queryAllProjects)
}
