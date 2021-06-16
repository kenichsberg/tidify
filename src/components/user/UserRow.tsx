import { FC } from 'react'
import { Edit, User, Award, List } from 'react-feather'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'

type Props = {
  user: NexusGenFieldTypes['User'] & {
    projects: NexusGenFieldTypes['Project'][]
  }
  index: number
}

export const UserRow: FC<Props> = ({ user, index }) => {
  const projectList = user.projects?.map((project) => project.name)?.join(', ')
  return (
    <div className="flex flex-col h-60 md:h-20 md:flex-row justify-around items-center font-mono text-sm text-bluegray-700 bg-bluegray-100 shadow-sm hover:shadow rounded-xl my-2 px-5 py-3">
      <div className="flex-1 truncate text-center py-4">{index + 1}</div>
      <div className="flex-3 md:flex-2 flex justify-stretch items-center">
        <User className="stroke-current text-bluegray-500 mr-2" size={16} />
        <div className="flex flex-col items-stretch">
          <p className="truncate">{user.name}</p>
          <p className="truncate text-bluegray-400">{user.email}</p>
        </div>
      </div>
      <div className="flex-2 md:flex-2 flex justify-stretch items-center">
        <Award className="stroke-current text-bluegray-500 mr-2" size={16} />
        <div className="truncate">{getRole(user.role)}</div>
      </div>
      <div className="flex-2 md:flex-4 flex justify-stretch items-center">
        <List className="stroke-current text-bluegray-500 mr-2" size={16} />
        <p className="truncate">{projectList}</p>
      </div>
      <button
        className={`flex-1 self-stretch flex justify-center items-center truncate text-cyan-500 ${
          /*hover:text-cyan-400 transform hover:scale-110 cursor-pointer*/ ''
        }hover:text-bluegray-400 py-4 focus:outline-none cursor-not-allowed`}
        onClick={(e) => {
          e.target
        }}
      >
        <Edit size={16} />
      </button>
    </div>
  )
}

const getRole = (role: Props['user']['role']) => {
  switch (role) {
    case 'ADMIN':
      return <p className="truncate text-fuchsia-800">Administrator</p>
    case 'USER':
      return <p className="truncate text-teal-800">User</p>
    default:
      return <p></p>
  }
}
