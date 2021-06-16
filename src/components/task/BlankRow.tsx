import { FC } from 'react'
import { Plus } from 'react-feather'

type Props = {
  callback: (arg0: any) => void
}

export const BlankRow: FC<Props> = ({ callback }) => (
  <button
    className="flex flex-row justify-center items-center w-full bg-bluegray-100 bg-opacity-50 shadow-sm group hover:bg-opacity-40 hover:shadow rounded-xl my-2 px-5 py-3 focus:outline-none"
    onClick={callback}
  >
    <span className="self-center rounded-full h-8 w-8 flex items-center justify-center bg-cyan-500 text-bluegray-100 group-hover:bg-cyan-400 group-hover:text-bluegray-200">
      <Plus size={24} />
    </span>
  </button>
)
