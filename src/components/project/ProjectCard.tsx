import { useState, useReducer, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  ProjectCardHeader,
  ProjectCardBody,
  BlankCard,
} from '@/components/project'
import { useProjectModal, useProject } from '@/contexts/project'

import { Mode, Action, MutationType } from '@/components/types'
import {
  ProjectWithoutTechnicalColmuns,
  ProjectForm,
} from '@/components/project/types'

type Props = {
  project: ProjectWithoutTechnicalColmuns
  index: number
}

export function ProjectCard({ project, index }: Props) {
  const [mutationType, setMutationType] = useState<MutationType>(undefined)
  const isNew = project === null
  const isAdded = project.uuid === uuidv4()
  const initialMode = isAdded ? 'processing' : 'normal'
  const [mode, dispatch] = useReducer(reducer, initialMode)
  const { setState: setProject } = useProject()

  const { state: modalState, dispatch: dispatchModalState } = useProjectModal()
  if (!modalState || !dispatchModalState) {
    throw new Error('context value undefined')
  }

  const projectFormRef = useRef<ProjectForm | undefined>()

  useEffect(() => {
    setProject?.(project)
  }, [project])

  if (isNew && mode === 'normal') {
    return <BlankCard callback={() => dispatch(null)} />
  }

  return (
    <button
      className="flex flex-col items-stretch font-mono text-sm text-center text-bluegray-700 bg-gradient-to-br from-bluegray-100/90 to-bluegray-200 shadow rounded-xl h-56 my-2 px-5 py-3 cursor-pointer group transform-gpu transition duration-500 ease-out animate-slide-up md:hover:shadow-2xl md:hover:scale-[108%] md:hover:z-[2] md:hover:-translate-y-1 active:shadow-sm active:scale-[95%] active:translate-y-[0.4rem] md:active:shadow md:active:scale-[97%] md:active:translate-y-[0.6rem] focus:outline-none"
      style={{ animationDelay: `${0.14 * index}s` }}
      onClick={() => dispatchModalState({ type: 'open', data: { ...project } })}
    >
      <ProjectCardHeader
        mode={mode}
        dispatch={dispatch}
        setMutationType={setMutationType}
        isNew={isNew}
      />
      <ProjectCardBody
        isLoading={!project}
        isEditing={mode === 'edit'}
        formRef={projectFormRef}
      />
    </button>
  )
}

function reducer(mode: Mode, action: Action): Mode {
  switch (mode) {
    case 'normal':
      return 'edit'
    case 'edit': {
      action?.setMutationType && action.setMutationType(action.type)
      return 'processing'
    }
    case 'processing':
      return 'normal'
  }
}
