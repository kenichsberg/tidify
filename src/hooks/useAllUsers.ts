import useSWR from 'swr'
import { request, gql } from 'graphql-request'
import { queryAllUsers } from 'pages/users'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'
import { API } from 'core/client'
import { OptionTagObject } from 'components/common/SelectPicker/types'

type User = NexusGenFieldTypes['User']

/*
const queryAllUsers = gql`
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

export function useAllUsers(): OptionTagObject[] {
  const { data: allUsers } = useSWR(queryAllUsers, (query) =>
    request(API, query)
  )
  return (
    allUsers?.users.map((user: User) => ({
      label: user.name,
      value: user.id,
    })) ?? []
  )
}
