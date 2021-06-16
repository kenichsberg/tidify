import { FC } from 'react'
import { User, Activity, Calendar } from 'react-feather'
import { ToggleableFormText, ToggleableFormSelect, Duration } from './'
import { statusList } from './constants'

import { TaskFormRef } from './types'
import { getOptionTagObjects } from 'utils/functions'
import { TaskSchema, UserSchema } from 'schema/model/types'

type Props = {
  task: TaskSchema | null
  users: UserSchema[]
  isLoading: boolean
  isEditing: boolean
  formRef: TaskFormRef
}

export const TaskContent: FC<Props> = ({
  task,
  users,
  isLoading,
  isEditing,
  formRef,
}) => {
  const userOptions = getOptionTagObjects<UserSchema>(users, 'name', 'id')
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-stretch items-center md:px-3">
      <div className="max-w-4xl md:w-full md:h-20 flex flex-col md:flex-row justify-around md:justify-between items-center md:items-stretch mt-3">
        <div className="flex-2 md:w-1/2 max-w-md flex items-center text-left text-base font-bold truncate mb-5 md:mb-0">
          <ToggleableFormText
            isEditing={isEditing}
            initialValue={task?.name}
            label="Task name"
            name="name"
            formRef={formRef}
            className="w-full text-sm"
            wrapperClassName="w-full"
          />
        </div>
        <div className="flex-1 md:w-1/5 min-w-max flex items-center my-2 md:my-0 md:pl-3">
          <User className="stroke-current text-bluegray-500 mr-2" size={16} />
          <ToggleableFormSelect
            isEditing={isEditing}
            name="user"
            options={userOptions}
            initialValue={task?.user.id}
            isNullable={false}
            formRef={formRef}
            label="User"
            className="w-full"
            wrapperClassName="w-full"
          />
        </div>
        <div className="flex-1 md:w-1/4 flex items-center my-2 md:my-0 md:pl-3">
          <Activity
            className="stroke-current text-bluegray-500 mr-2"
            size={16}
          />
          <ToggleableFormSelect
            isEditing={isEditing}
            name="status"
            options={statusList}
            initialValue={task?.status}
            isNullable={false}
            formRef={formRef}
            label="Status"
            className="w-full"
            wrapperClassName="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow justify-stretch items-center md:pb-5">
        <div className="flex-4 flex flex-col md:flex-row items-center py-8 md:py-0">
          <Calendar
            className="stroke-current text-bluegray-500 mr-2"
            size={16}
          />
          <div className="flex-grow flex flex-col justify-evenly items-stretch">
            <Duration
              isEditing={isEditing}
              names={{
                startDatetime: 'startAt',
                endDatetime: 'endAt',
                hour: 'manHour',
              }}
              rowLabel="Plan"
              startDatetimeStr={task?.startAt}
              endDatetimeStr={task?.endAt}
              hour={task?.manHour ?? 0}
              formRef={formRef}
            />
            <Duration
              isEditing={isEditing}
              names={{
                startDatetime: 'startedAt',
                endDatetime: 'endedAt',
                hour: 'manHourResult',
              }}
              rowLabel="Result"
              startDatetimeStr={task?.startedAt}
              endDatetimeStr={task?.endedAt}
              hour={task?.manHourResult ?? 0}
              formRef={formRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
