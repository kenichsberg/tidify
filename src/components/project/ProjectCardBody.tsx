import { Users } from 'react-feather'
import { ProgressBar, RemainingTime, AddTaskButton } from '@/components/project'
//ToDo move to proper directory
import {
  ToggleableFormText,
  ToggleableFormSelectMultiple,
} from '@/components/common'
import { useProject } from '@/contexts/project'

import {
  ProjectFormRef,
  UserWithoutTechnicalColmuns,
  TaskWithoutTechnicalColmuns,
} from '@/components/project/types'
import { getOptionTagObjects } from '@/utils/functions'
//import { useAllUsers } from 'hooks/index'

type Props = {
  isLoading: boolean
  isEditing: boolean
  formRef: ProjectFormRef
}

export function ProjectCardBody({
  isLoading,
  isEditing,
  formRef,
}: Props): JSX.Element {
  const { state: project } = useProject()
  //const allUsers = useAllUsers()
  const allUsers = project?.users ?? []
  const selectedUserOptions = getOptionTagObjects<UserWithoutTechnicalColmuns>(
    project?.users ?? [],
    'name',
    'uuid'
  )

  const projectPercentage = getProgressPercentage(project?.tasks ?? [])

  return (
    <>
      <div className="flex-4 flex flex-col justify-center items-stretch font-bold truncate">
        <ToggleableFormText
          isEditing={isEditing}
          initialValue={project?.name}
          label="Project name"
          name="name"
          formRef={formRef}
          className="w-full text-sm"
          wrapperClassName="w-full"
        />
        {isEditing ? null : (
          <>
            <p className="text-left text-xs mt-4">Progress</p>
            <ProgressBar className="mt-1" percent={projectPercentage} />
            <p className="text-right text-xs mt-1">
              {projectPercentage ?? '--'}%
            </p>
          </>
        )}
      </div>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex-grow flex text-left text-xs text-bluegray-400">
          {
            //<Users className="self-center mr-2" size={16} />
          }
          <ToggleableFormSelectMultiple
            isEditing={isEditing}
            options={allUsers.map((user) => ({
              label: user.name,
              value: user.uuid,
            }))}
            initialValues={selectedUserOptions}
            label="Users"
            name="users"
            formRef={formRef}
            className="w-full text-sm"
            wrapperClassName="w-full"
          />
        </div>
        {getElement(
          isEditing,
          projectPercentage ?? 0,
          project?.endAt ?? undefined
        )}
      </div>
    </>
  )
}

function getProgressPercentage(
  tasks: TaskWithoutTechnicalColmuns[]
): number | undefined {
  if (!tasks?.length) return undefined

  const total = tasks
    .map((task) => task.plannedDuration)
    .reduce((total, current) => total + current)
  const tasksDone = tasks.filter((task) => task.status === 'DONE')
  const done = tasksDone
    ?.map((task) => task.actualDuration)
    .reduce((total, current) => total + current, 0)

  if (total === 0) return undefined

  return Math.trunc((done / total) * 100)
}

function getElement(
  isEditing: boolean,
  projectPercentage: number,
  projectEndDate: Date | undefined
): JSX.Element | null {
  switch (true) {
    case isEditing:
      return null
    case projectPercentage === 100:
      return null
    default:
      return (
        <div className="w-2/3">
          <RemainingTime targetDate={projectEndDate} />
        </div>
      )
  }
}
