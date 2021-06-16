import { FC } from 'react'
import { UserRow } from 'components/user'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'

type Props = {
  users: (NexusGenFieldTypes['User'] & {
    projects: NexusGenFieldTypes['Project'][]
  })[]
}

export const UserList: FC<Props> = ({ users }) => (
  <>
    <h2 className="font-mono text-2xl font-bold text-bluegray-500 mt-1 mb-7 ml-4 md:ml-2 md:mb-9">
      Users
    </h2>
    <div className="bg-bluegray-200 shadow-md rounded-3xl my-3 px-5 py-6">
      {users?.map((user, index) => (
        <div key={user.id}>
          <UserRow user={user} index={index} />
        </div>
      ))}
    </div>
  </>
)
