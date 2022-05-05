import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { useFormContext } from 'react-hook-form'
import { Move, Plus, Trash2 } from 'react-feather'
import { DevTool } from '@hookform/devtools'
import { v4 as uuidv4 } from 'uuid'

import { InputField } from '@/components/common'
import { RhfInput, RhfSelect } from '@/components/rhf-wrapper'
import { dndTypes } from '@/components/project/constants'
import { useTasksOfProject, useTaskUuids } from '@/contexts/task'
import { useUsers } from '@/contexts/user'

type Props = {
  isDummy?: boolean
  index: number
}

export function ProjectFormTaskBlock({
  isDummy = false,
  index,
}: Props): JSX.Element {
  const { state: tasks, setState: setTasks } = useTasksOfProject()
  const { state: taskUuids, setState: setTaskUuids } = useTaskUuids()
  const { state: users } = useUsers()

  if (!tasks || !setTasks) {
    throw new Error('Tasks context undefined')
  }
  if (!taskUuids || !setTaskUuids) {
    throw new Error('TaskUuids context undefined')
  }

  if (!users) {
    throw new Error('Users context undefined')
  }

  const task = tasks?.[index]
  if (!task) {
    throw new Error('task undefined')
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dndTypes.TASK,
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const {
    control,
    formState: { errors },
    register,
    unregister,
    setValue,
  } = useFormContext()

  const selectOptionsUser = users.map((user) => ({
    label: user.name,
    value: user.id,
  }))

  const onFocus = isDummy
    ? () => {
        const newUuid = uuidv4()
        setTasks([
          ...tasks,
          { uuid: newUuid, name: '', plannedDuration: 0, userId: undefined },
        ])
        setTaskUuids([...taskUuids, newUuid])
      }
    : undefined

  const immutableIndex = taskUuids.indexOf(task.uuid)
  const fieldName = `tasks[${immutableIndex}]`

  useEffect(() => {
    setValue(`${fieldName}.rank`, index)
  }, [index])

  useEffect(() => {
    setValue(`${fieldName}.isDummy`, isDummy)
  }, [isDummy])

  return (
    <div className="relative flex flex-col sm:flex-row justify-between items-center font-mono text-sm text-bluegray-700">
      <div
        className="absolute translate-x-[2.2rem] translate-y-[0.6rem] z-[5] sm:static sm:translate-x-0 sm:translate-y-0 flex-shrink self-start sm:self-auto flex justify-center items-center bg-gradient-to-br from-white  via-white to-bluegray-50 sm:from-bluegray-50  sm:via-bluegray-50 sm:to-bluegray-100 sm:text-black shadow rounded-full w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-0 sm:mr-2 animate-popup"
        style={{ animationDelay: `${0.2 * index}s` }}
      >
        <div className="flex items-center text-bluegray-500">
          {getIndexElement(isDummy, index)}
        </div>
      </div>
      <fieldset
        name={fieldName}
        ref={isDummy ? undefined : drag}
        className={`group flex-glow w-11/12 flex flex-col sm:flex-row justify-evenly items-center bg-gradient-to-br from-bluegray-50/90 to-bluegray-100 shadow rounded-xl text-center px-4 pt-6 pb-3 ${
          isDragging ? 'opacity-50' : ''
        } ${
          isDummy ? '' : 'cursor-move'
        } transition  transform transition duration-500 animate-popup hover:shadow-2xl hover:scale-[103%] hover:-translate-y-1`}
        style={{ animationDelay: `${0.2 * index}s` }}
      >
        <div className="flex-1 flex justify-center items-center pb-5 transition">
          <Move
            className={`text-bluegray-400 ${
              isDummy
                ? 'invisible'
                : 'invisible group-hover:visible text-cyan-500'
            }`}
            size={16}
          />
        </div>
        <input
          type="hidden"
          {...register(`${fieldName}.uuid`, { value: task.uuid })}
        />
        <input
          type="hidden"
          {...register(`${fieldName}.rank`, { value: index })}
        />
        <input
          type="hidden"
          {...register(`${fieldName}.isDummy`, { value: isDummy })}
        />
        <div className="flex-grow max-w-md">
          <InputField label="Task Name" className="">
            <RhfInput
              className="w-full text-center"
              name={`${fieldName}.name`}
              onFocus={onFocus}
              rules={{ required: !isDummy }}
              control={control}
              value={task.name}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors?.tasks?.[immutableIndex]?.name ? '' : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
        <div className="flex-shrink w-48 flex flex-col items-center">
          <InputField label="Duraiton" className="w-24">
            <RhfInput
              type="number"
              className="w-full text-center"
              name={`${fieldName}.plannedDuration`}
              onFocus={onFocus}
              rules={{ required: !isDummy }}
              control={control}
              value={task.plannedDuration + ''}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors?.tasks?.[immutableIndex]?.plannedDuration
                ? ''
                : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
        <div className="flex-shrink w-48">
          <InputField label="Executor" className="">
            <RhfSelect
              className="w-full text-center"
              name={`${fieldName}.userId`}
              onFocus={onFocus}
              rules={{ required: !isDummy }}
              control={control}
              value={task.userId}
              options={selectOptionsUser}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors?.tasks?.[immutableIndex]?.userId ? '' : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
        <button
          className={`flex-1 flex flex-col items-stretch text-bluegray-400 ${
            isDummy
              ? 'invisible'
              : 'sm:invisible group-hover:visible group-focus:visible'
          } cursor-pointer focus:outline-none hover:text-red-600 active:text-red-400`}
          onClick={() => {
            setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)])
            unregister(fieldName)
          }}
        >
          <span className="pb-5 flex-grow flex items-center justify-center focus:outline-none transition">
            <Trash2 size={20} />
          </span>
        </button>
      </fieldset>
      {isDummy ? <DevTool control={control} /> : null}
    </div>
  )
}

function getIndexElement(isDummy: boolean, index: number): JSX.Element {
  if (isDummy) {
    return <Plus size={16} />
  }
  return <span>{index + 1}</span>
}
