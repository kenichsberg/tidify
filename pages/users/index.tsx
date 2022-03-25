import { FC } from 'react'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
//import { gql } from 'graphql-request'
import { Layout } from 'components/layout'
import { UserList } from 'components/user'
import { fetcher } from 'core/client'

import { UserSchema } from 'schema/model/types'

type Props = {
  data: {
    users: UserSchema[]
    status: number
  }
}

/*
export const queryAllUsers = gql`
  query {
    users(orderBy: { id: asc }) {
      id
      name
      email
      role
      projects {
        id
        name
      }
    }
  }
`
*/

const IndexPage: FC<Props> = (props) => {
  const { data, error } = useSWR(queryAllUsers, fetcher, {
    initialData: props.data,
  })

  if (error && !data) return <div>error</div>
  //if (!data) return <div>loading...</div>

  return (
    <Layout currentPageName="Users">
      <UserList users={data?.users ?? []} />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(queryAllUsers)
  return { props: { data } }
}
