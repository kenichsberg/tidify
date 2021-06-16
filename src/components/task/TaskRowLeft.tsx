import { FC, Dispatch } from 'react'
import { Trash2, Feather, Plus } from 'react-feather'

import { Mode, Action, SetMutationType } from 'components/types'

type Props = {
  mode: Mode
  index: number | null
  dispatch: Dispatch<Action>
  setMutationType: SetMutationType
}

export const TaskRowLeft: FC<Props> = ({
  mode,
  index,
  dispatch,
  setMutationType,
}) => {
  const wrapperClass =
    mode === 'edit' && index !== null
      ? ' transform hover:scale-110 cursor-pointer'
      : ''

  return (
    <div
      className={`flex flex-col flex-grow justify-center min-w-max h-full truncate group py-4 lg:px-8 ${wrapperClass}`}
      onClick={() =>
        mode === 'edit' && index !== null
          ? dispatch({
              type: 'delete',
              setMutationType: setMutationType,
            })
          : undefined
      }
    >
      {getLeftButton(mode, index)}
    </div>
  )
}

function getLeftButton(mode: Mode, index: number | null) {
  switch (mode) {
    case 'normal':
      if (index === null) return
      return <span className="w-4 self-center">{index + 1}</span>
    case 'edit':
      if (index === null) {
        return (
          <div className="self-center focus:outline-none">
            <Plus size={16} />
          </div>
        )
      }
      return (
        <button className="text-rose-800 group-hover:text-rose-600 focus:outline-none">
          <Trash2 size={20} />
        </button>
      )
    case 'processing':
      return (
        <div className="self-center text-bluegray-400 focus:outline-none">
          <Feather size={16} />
        </div>
      )
  }
}
