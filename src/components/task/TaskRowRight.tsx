import { FC, Dispatch } from 'react'
import { Edit, Check } from 'react-feather'
import { Spinner } from 'components/common'

import { Mode, Action, SetMutationType } from 'components/types'

type Props = {
  mode: Mode
  isNew: boolean
  dispatch: Dispatch<Action>
  setMutationType: SetMutationType
}

export const TaskRowRight: FC<Props> = ({
  mode,
  isNew,
  dispatch,
  setMutationType,
}) => {
  const wrapperClass =
    mode === 'processing' ? '' : ' transform hover:scale-110 cursor-pointer'

  return (
    <div
      className={`flex flex-col flex-grow justify-center items-center min-w-max h-full truncate group py-6 lg:px-8 ${wrapperClass}`}
      onClick={() =>
        dispatch({
          type: isNew ? 'create' : 'update',
          setMutationType: setMutationType,
        })
      }
    >
      {getRightButton(mode)}
    </div>
  )
}

function getRightButton(mode: Mode) {
  switch (mode) {
    case 'normal':
      return (
        <button className="text-cyan-500 group-hover:text-cyan-400 focus:outline-none">
          <Edit size={16} />
        </button>
      )
    case 'edit':
      return (
        <button className="text-teal-600 group-hover:text-teal-400 focus:outline-none">
          <Check size={20} />
        </button>
      )
    case 'processing':
      return (
        <button
          className="focus:outline-none cursor-not-allowed"
          disabled={true}
        >
          <Spinner className="text-bluegray-400" />
        </button>
      )
  }
}
