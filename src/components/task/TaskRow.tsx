import { FC, useState, useReducer, useEffect, useRef } from 'react'
import { useCache } from 'hooks/index'
import {
  TaskContent,
  TaskRowLeft,
  TaskRowRight,
  tasksPerProject,
  usersPerProject,
  BlankRow,
} from './'
import {
  requestCreateOneTask,
  requestUpdateOneTask,
  requestDeleteOneTask,
} from './helpers'
import { statusList, Status } from './constants'
import { useCRUD } from 'hooks/index'
import { getFirstObjectValue } from 'utils/functions'

import { TaskForm } from './types'
import { Mode, Action, MutationType } from 'components/types'
import { TaskSchema, UserSchema } from 'schema/model/types'

type Props = {
  task: TaskSchema | null
  users: UserSchema[]
  projectId: number
  index: number | null
}

export const TaskRow: FC<Props> = ({ task, users, projectId, index }) => {
  const [mutationType, setMutationType] = useState<MutationType>(undefined)

  const isNew = task === null
  // ToDo: assign proper unique id
  const isAdded = task?.id === 999999999
  const initialMode = isAdded ? 'processing' : 'normal'
  const [mode, dispatch] = useReducer(reducer, initialMode)

  const { data: cachedTasks } = useCache<TaskSchema[]>([
    tasksPerProject,
    projectId,
  ])
  const { data: cachedUsers } = useCache<UserSchema[]>([
    usersPerProject,
    projectId,
  ])

  const taskFormRef = useRef<TaskForm | undefined>()

  useCRUD(
    mode !== 'processing',
    mutationType,
    (arg0) =>
      requestCreateOneTask(projectId, arg0, taskFormRef, () =>
        dispatch({ type: 'create' })
      ),
    (arg0) =>
      requestUpdateOneTask(task?.id, projectId, arg0, taskFormRef, () =>
        dispatch(null)
      ),
    (arg0) => requestDeleteOneTask(task?.id, projectId, arg0),
    [cachedTasks]
  )

  useEffect(() => {
    if (mode !== 'processing') return
    if (isAdded) return
    dispatch(null)
  }, [task?.id])

  useEffect(() => {
    taskFormRef.current = {
      name: task?.name ?? '',
      status: {
        value:
          task?.status ??
          getFirstObjectValue<Status, 'value'>(statusList, 'value') ??
          'WIP',
      },
      manHour: task?.manHour ?? 0,
      startAt: task?.startAt ?? '',
      endAt: task?.endAt ?? '',
      manHourResult: task?.manHourResult ?? 0,
      startedAt: task?.startedAt ?? '',
      endedAt: task?.endedAt ?? '',
      user: {
        value:
          task?.user.id ??
          getFirstObjectValue<UserSchema, 'id'>(cachedUsers ?? [], 'id') ??
          0,
      },
      projectId: projectId,
    }
    console.log(2, taskFormRef.current)
  }, [task])

  if (isNew && mode === 'normal') {
    return <BlankRow callback={() => dispatch(null)} />
  }

  const bgColor = mode === 'edit' ? ' bg-bluegray-50' : ' bg-bluegray-100'
  return (
    <div
      className={`flex flex-col lg:flex-row items-center font-mono text-sm text-center text-bluegray-700 ${bgColor} shadow-sm hover:shadow rounded-xl my-2 px-5 py-3`}
    >
      <div className="flex-shrink self-stretch">
        <TaskRowLeft
          mode={mode}
          index={index}
          dispatch={dispatch}
          setMutationType={setMutationType}
        />
      </div>
      <div className="flex-grow">
        <TaskContent
          task={task}
          users={users}
          isLoading={!task}
          isEditing={mode === 'edit'}
          formRef={taskFormRef}
        />
      </div>
      <div className="flex-shrink self-stretch">
        <TaskRowRight
          mode={mode}
          isNew={isNew}
          dispatch={dispatch}
          setMutationType={setMutationType}
        />
      </div>
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
