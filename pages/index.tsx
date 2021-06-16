import { FC } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { gql, request } from 'graphql-request'
import { Layout } from 'components/layout'
import { ProjectsPage } from 'components/project'
import { API, fetcher } from 'core/client'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  data: {
    projects: ProjectSchema[]
    status: number
  }
}

export const queryAllProjects = gql`
  query {
    projects(orderBy: { id: asc }) {
      id
      name
      startAt
      endAt
      users(orderBy: { id: asc }) {
        id
        name
        email
        role
      }
      tasks(orderBy: { id: asc }) {
        id
        name
        rank
        status
        plannedDuration
        actualDuration
        user {
          id
          name
        }
        projectId
      }
    }
  }
`

const IndexPage: FC<Props> = (props) => {
  const { data, error } = useSWR<{ projects: ProjectSchema[] }>(
    queryAllProjects,
    (query) => request(API, query),
    {
      initialData: props.data,
    }
  )

  if (error && !data) return <div>error</div>
  //if (!data) return <div>loading...</div>

  return (
    <Layout currentPageName="Home">
      <ProjectsPage projects={data?.projects ?? []} />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(queryAllProjects)
  return { props: { data } }
}
