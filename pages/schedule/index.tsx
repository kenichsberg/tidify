import { FC } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
//import { gql } from 'graphql-request'
import { Layout } from 'components/layout'
import { Chart } from 'components/schedule'
import { fetcher } from 'core/client'

import { TaskSchema } from 'schema/model/types'

type Props = {
  data: {
    tasks: TaskSchema[]
    status: number
  }
}

/*
const tasks = gql`
  query {
    tasks(orderBy: [{ projectId: asc }, { startAt: asc }, { id: asc }]) {
      id
      name
      manHour
      startAt
      endAt
      startedAt
      endedAt
      user {
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`
*/

const IndexPage: FC<Props> = (props) => {
  const { data, error } = useSWR(tasks, fetcher, {
    initialData: props.data,
  })

  if (error && !data) return <div>error</div>
  //if (!data) return <div>loading...</div>

  return (
    <Layout currentPageName="Schedule">
      <Chart tasks={data?.tasks ?? []} />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(tasks)
  return { props: { data } }
}
