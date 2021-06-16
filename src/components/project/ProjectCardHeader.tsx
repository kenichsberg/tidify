import { FC, Dispatch } from 'react'
import { Edit, Check, Clock, Trash2, Plus } from 'react-feather'
import { Spinner } from 'components/common'
import { formatDatetimeDisplay } from 'utils/date'

import { Mode, Action, SetMutationType } from 'components/types'

type Props = {
  mode: Mode
  projectEndDate: Date | undefined
  dispatch: Dispatch<Action>
  setMutationType: SetMutationType
  isNew: boolean
}

export const ProjectCardHeader: FC<Props> = ({
  mode,
  projectEndDate,
  dispatch,
  setMutationType,
  isNew,
}) => {
  const rightElementClass =
    mode === 'processing' ? '' : ' transform hover:scale-110 cursor-pointer'

  return (
    <div className="flex-1 flex justify-between items-center">
      {getLeftElement(mode, dispatch, setMutationType, isNew)}
      {getCenterElement(
        mode,
        isNew,
        formatDatetimeDisplay(projectEndDate?.toISOString())
      )}
      <div
        className={`w-16 flex-shrink self-stretch flex justify-end min-w-max truncate group ${rightElementClass}`}
        onClick={() =>
          dispatch({
            type: isNew ? 'create' : 'update',
            setMutationType: setMutationType,
          })
        }
      >
        {getRightButton(mode)}
      </div>
    </div>
  )
}

const getLeftElement = (
  mode: Mode,
  dispatch: Dispatch<Action>,
  setMutationType: SetMutationType,
  isNew: boolean
) => {
  if (mode !== 'edit') return null

  const leftElementClass = isNew
    ? ''
    : ' transform hover:scale-110 cursor-pointer'

  return (
    <div
      className={`w-16 flex-shrink self-stretch flex justify-start min-w-max truncate group ${leftElementClass}`}
      onClick={() =>
        isNew
          ? undefined
          : dispatch({
              type: 'delete',
              setMutationType: setMutationType,
            })
      }
    >
      {isNew ? (
        <button className="flex justify-center items-center focus:outline-none">
          <Plus size={16} />
        </button>
      ) : (
        <button className="flex justify-center items-center focus:outline-none text-rose-800 group-hover:text-rose-600">
          <Trash2 size={20} />
        </button>
      )}
    </div>
  )
}

const getCenterElement = (mode: Mode, isNew: boolean, dateStr: string) => {
  switch (mode) {
    case 'edit':
      return <div>{isNew ? 'New Project' : 'Edit Project'}</div>
    default:
      return (
        <div className="flex-4 flex text-left text-xs text-bluegray-400">
          <Clock className="self-center mr-2" size={16} />
          <span>{dateStr}</span>
        </div>
      )
  }
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
