import { FC, useState, useReducer, useEffect, useRef } from 'react'
import useSWR from 'swr'
import { ProjectCardHeader, ProjectContent, BlankCard } from './'
import {
  requestCreateOneProject,
  requestUpdateOneProject,
  requestDeleteOneProject,
} from './helpers'
import { queryAllProjects } from 'pages'
import { useCRUD } from 'hooks/index'
import { fetcher } from 'core/client'
import { getMaxDate } from 'utils/date'

import { Mode, Action, MutationType } from 'components/types'
import { ProjectSchema } from 'schema/model/types'
import { ProjectForm } from './types'

type Props = {
  project: ProjectSchema | null
}

export const ProjectCard: FC<Props> = ({ project }) => {
  const [mutationType, setMutationType] = useState<MutationType>(undefined)
  const isNew = project === null
  // ToDo: assign proper unique id
  const isAdded = project?.id === 999999999
  const initialMode = isAdded ? 'processing' : 'normal'
  const [mode, dispatch] = useReducer(reducer, initialMode)
  const { data: refetchedProjects } = useSWR(queryAllProjects, fetcher)
  const projects = refetchedProjects?.projects ?? []

  const projectFormRef = useRef<ProjectForm | undefined>()

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

  useEffect(() => {
    if (mode !== 'processing') return
    if (isAdded) return
    dispatch(null)
  }, [project?.id])

  useEffect(() => {
    projectFormRef.current = {
      id: project?.id ?? 0,
      name: project?.name ?? '',
      users:
        project?.users.map((user) => ({
          value: user.id,
          label: user.name,
        })) ?? [],
    }
  }, [project])

  //const projectEndDate = getProjectEndDate(project?.tasks ?? [])
  const projectEndDate = new Date(project?.endAt)

  if (isNew && mode === 'normal') {
    return <BlankCard callback={() => dispatch(null)} />
  }

  return (
    <div className="flex flex-col items-stretch font-mono text-sm text-center text-bluegray-700 bg-bluegray-100 shadow-sm hover:shadow-lg rounded-xl h-72 my-2 px-5 py-3">
      <ProjectCardHeader
        mode={mode}
        projectEndDate={projectEndDate}
        dispatch={dispatch}
        setMutationType={setMutationType}
        isNew={isNew}
      />
      <ProjectContent
        project={project}
        projectEndDate={projectEndDate}
        isLoading={!project}
        isEditing={mode === 'edit'}
        formRef={projectFormRef}
      />
    </div>
  )
}

/*
function getProjectEndDate(tasks: ProjectSchema['tasks']): Date | undefined {
  if (!tasks?.length) return undefined

  const endDates = tasks
    .filter((task) => task.endAt !== undefined)
    .map((task) => new Date(task.endAt))

  if (!endDates?.length) return undefined

  return getMaxDate(endDates)
}
*/

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
