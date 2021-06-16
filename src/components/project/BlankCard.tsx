import { FC } from 'react'
import { Plus } from 'react-feather'

type Props = {
  callback: (arg0: any) => void
}

export const BlankCard: FC<Props> = ({ callback }) => {
  const bgOpacity = 'bg-opacity-50 hover:bg-opacity-40'

  return (
    <button
      className={`flex flex-col justify-center items-stretch font-mono text-sm text-center text-bluegray-700 bg-bluegray-100 group hover:bg-gray-100 shadow-sm hover:shadow-lg ${bgOpacity} rounded-xl h-72 my-2 px-5 py-3  focus:outline-none`}
      onClick={callback}
    >
      <span className="self-center rounded-full h-8 w-8 flex items-center justify-center bg-cyan-500 text-bluegray-100 group-hover:bg-cyan-400 group-hover:text-bluegray-200">
        <Plus size={24} />
      </span>
    </button>
  )
}
