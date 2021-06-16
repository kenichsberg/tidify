import { FC } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import { gql } from 'graphql-request'
import { Layout } from 'components/layout'
import { TasksPage } from 'components/task'
import { fetcher } from 'core/client'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  data: {
    projects: ProjectSchema[]
    status: number
  }
}

export const queryAllProjectsForTasks = gql`
  query {
    projects(orderBy: { id: asc }) {
      id
      name
      users(orderBy: { id: asc }) {
        id
        name
        email
        role
      }
      tasks(orderBy: { id: asc }) {
        id
        name
        status
        manHour
        startAt
        endAt
        manHourResult
        startedAt
        endedAt
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
  const { data, error } = useSWR(queryAllProjectsForTasks, fetcher, {
    initialData: props.data,
  })

  if (error && !data) return <div>error</div>
  //if (!data) return <div>loading...</div>

  return (
    <Layout currentPageName="Tasks">
      <TasksPage projects={data?.projects ?? []} />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(queryAllProjectsForTasks)
  return { props: { data } }
}
