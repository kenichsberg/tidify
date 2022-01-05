import { FC, useState, useReducer, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useSWR from 'swr'
import {
  ProjectCardHeader,
  ProjectCardBody,
  BlankCard,
} from '@/components/project'
//import { ProjectProvider } from '@/contexts/project'
import { useProject } from '@/contexts/project'
/*
import {
  requestCreateOneProject,
  requestUpdateOneProject,
  requestDeleteOneProject,
} from './helpers'
import { queryAllProjects } from 'pages'
import { useCRUD } from 'hooks/index'
import { fetcher } from 'core/client'
*/
import { getMaxDate } from 'utils/date'

import { Mode, Action, MutationType } from '@/components/types'
import {
  ProjectWithoutTechnicalColmuns,
  ProjectForm,
} from '@/components/project/types'

type Props = {
  project: ProjectWithoutTechnicalColmuns
}

//export const ProjectCard: FC<Props> = ({ project }) => {
export function ProjectCard({ project }: Props) {
  const [mutationType, setMutationType] = useState<MutationType>(undefined)
  const isNew = project === null
  const isAdded = project.uuid === uuidv4()
  const initialMode = isAdded ? 'processing' : 'normal'
  const [mode, dispatch] = useReducer(reducer, initialMode)
  const { setState: setProject } = useProject()

  //const { setState: setProject } = useProject()
  //setProject && setProject(project)

  const projectFormRef = useRef<ProjectForm | undefined>()

  /*
  useCRUD(
    mode !== 'processing',
    mutationType,
    (arg0) =>
      requestCreateOneProject(projectFormRef, arg0, () => dispatch(null)),
    (arg0) =>
      requestUpdateOneProject(projectFormRef, arg0, () => {
        dispatch(null)
      }),
    (arg0) => requestDeleteOneProject(project?.id, arg0),
    [projects]
  )
*/

  /*
  useEffect(() => {
    if (mode !== 'processing') return
    if (isAdded) return
    dispatch(null)
  }, [project.uuid])

  useEffect(() => {
    projectFormRef.current = {
      uuid: project?.uuid ?? uuidv4(),
      name: project?.name ?? '',
      users:
        project?.users.map((user) => ({
          value: user.id,
          label: user.name,
        })) ?? [],
    }
  }, [project])
*/
  useEffect(() => {
    setProject?.(project)
  }, [project])

  if (isNew && mode === 'normal') {
    return <BlankCard callback={() => dispatch(null)} />
  }

  return (
    <div className="flex flex-col items-stretch font-mono text-sm text-center text-bluegray-700 bg-bluegray-200 shadow-sm hover:shadow-md rounded-xl h-56 my-2 px-5 py-3">
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
    </div>
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
