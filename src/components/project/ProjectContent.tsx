import { FC } from 'react'
import { Users } from 'react-feather'
import { ProgressBar, RemainingTime, AddTaskButton } from './'
//ToDo move to proper directory
import { ToggleableFormText } from 'components/task'
import { ToggleableFormSelectMultiple } from 'components/common'
import { ProjectFormRef } from './types'
import { diffDate } from 'utils/date'
import { getOptionTagObjects } from 'utils/functions'
import { useAllUsers } from 'hooks/index'

import { ProjectSchema, UserSchema } from 'schema/model/types'

type Props = {
  project: ProjectSchema | null
  projectEndDate: Date | undefined
  isLoading: boolean
  isEditing: boolean
  formRef: ProjectFormRef
}

export const ProjectContent: FC<Props> = ({
  project,
  projectEndDate,
  isLoading,
  isEditing,
  formRef,
}) => {
  const allUsers = useAllUsers()
  const selectedUserOptions = getOptionTagObjects<UserSchema>(
    project?.users ?? [],
    'name',
    'id'
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
          <Users className="self-center mr-2" size={16} />
          <ToggleableFormSelectMultiple
            isEditing={isEditing}
            options={allUsers}
            initialValues={selectedUserOptions}
            label="Users"
            name="users"
            formRef={formRef}
            className="w-full text-sm"
            wrapperClassName="w-full"
          />
        </div>
        {isEditing || projectPercentage === 100 ? null : projectEndDate ===
          undefined ? (
          <div className="w-1/2">
            <AddTaskButton />
          </div>
        ) : (
          <div className="w-1/2">
            <RemainingTime remainingHours={getRemainingHours(projectEndDate)} />
          </div>
        )}
      </div>
    </>
  )
}

function getProgressPercentage(
  tasks: ProjectSchema['tasks']
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

function getRemainingHours(endDate: Date | undefined): number | undefined {
  if (!endDate) return undefined

  const now = new Date()
  return diffDate(now, endDate, 'hour')
}
