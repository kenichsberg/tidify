import { Dispatch, MouseEvent } from 'react'
import { mutate } from 'swr'
import { Edit, Check, Clock, Trash2, Plus } from 'react-feather'

import { Spinner } from '@/components/common'
import { useProjectModal, useProject } from '@/contexts/project'
import { formatDatetimeDisplay } from '@/utils/date'

import { Mode, Action, SetMutationType } from '@/components/types'

type Props = {
  mode: Mode
  dispatch: Dispatch<Action>
  setMutationType: SetMutationType
  isNew: boolean
}

export function ProjectCardHeader({
  mode,
  dispatch,
  setMutationType,
  isNew,
}: Props): JSX.Element {
  const { state: modalState, dispatch: dispatchModalState } = useProjectModal()
  if (!modalState || !dispatchModalState) {
    throw new Error('context value undefined')
  }

  const { state: project } = useProject()
  if (!project) {
    throw new Error('context value undefined')
  }

  const rightElementClass =
    mode === 'processing' ? '' : ' transform hover:scale-110 cursor-pointer'

  return (
    <div className="flex-1 flex justify-between items-center">
      {getLeftElement(mode, dispatch, setMutationType, isNew)}
      {getCenterElement(
        mode,
        isNew,
        formatDatetimeDisplay(project.endAt?.toISOString())
      )}
      <div
        className="w-16 flex-shrink self-stretch flex justify-end min-w-max truncate transition group text-red-700 lg:text-bluegray-500 lg:invisible lg:group-hover:visible cursor-pointer hover:opacity-100 hover:text-red-700 lg:active:text-red-400"
        onClick={
          (event) => {
            onClick(event, project.uuid)
          }
          //dispatchModalState({ type: 'open', data: { ...project } })
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
        <span className="flex justify-center items-center focus:outline-none">
          <Plus size={16} />
        </span>
      ) : (
        <span className="flex justify-center items-center focus:outline-none text-rose-800 group-hover:text-rose-600">
          <Trash2 size={20} />
        </span>
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
        <div className="flex-4 flex text-left text-xs text-bluegray-500">
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
        <span className="focus:outline-none">
          <Trash2 size={20} />
        </span>
      )
    case 'edit':
      return (
        <span className="text-teal-600 group-hover:text-teal-400 focus:outline-none">
          <Check size={20} />
        </span>
      )
    case 'processing':
      return (
        <span className="focus:outline-none cursor-not-allowed">
          <Spinner className="text-bluegray-500" />
        </span>
      )
  }
}

async function onClick(event: MouseEvent<HTMLDivElement>, uuid: string) {
  event.stopPropagation()

  if (!window.confirm('delete this project?')) return

  //@TODO [DEMO version] disabled deleting
  alert("You don't have permission to delete projects.")
  return

  mutate(
    '/api/projects',
    (data: any[]) => data.filter((item) => item.uuid !== uuid),
    false
  )
  await fetch('/api/projects', {
    method: 'DELETE',
    body: JSON.stringify({ uuid }),
  })
  mutate('/api/projects')
}
