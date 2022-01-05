import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { useFormContext, Controller } from 'react-hook-form'
import { Move, Plus } from 'react-feather'
import { v4 as uuidv4 } from 'uuid'
import { DevTool } from '@hookform/devtools'

import { InputField, SelectPicker } from '@/components/common'
import { RhfInput, RhfSelect } from '@/components/rhf-wrapper'
import { dndTypes } from '@/components/project/constants'
import { useTasks, useTaskUuids } from '@/contexts/project'

//import { TaskFormProps } from '@/components/project/types'

type Props = {
  isDummy?: boolean
  index: number
}

export function ProjectFormTaskBlock({
  isDummy = false,
  index,
}: Props): JSX.Element {
  const { state: tasks, setState: setTasks } = useTasks()
  const { state: taskUuids, setState: setTaskUuids } = useTaskUuids()
  if (!tasks || !setTasks) {
    throw new Error('Tasks context undefined')
  }
  if (!taskUuids || !setTaskUuids) {
    throw new Error('TaskUuids context undefined')
  }

  const task = tasks?.[index]
  if (!task) {
    throw new Error('task undefined')
  }
  console.log(index, task.uuid, taskUuids.indexOf(task.uuid))

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
    setValue,
  } = useFormContext()

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

  return (
    <div className="flex flex-row justify-between items-center font-mono text-sm text-bluegray-700">
      <div className="flex-shrink flex justify-center items-center flex bg-bluegray-50 shadow rounded-full w-16 h-16">
        <div className="flex items-center text-bluegray-500">
          {getIndexElement(isDummy, index)}
        </div>
      </div>
      <fieldset
        name={fieldName}
        ref={isDummy ? undefined : drag}
        className={`flex-glow w-11/12 pt-6 flex justify-evenly bg-bluegray-50 shadow hover:shadow-lg rounded-xl text-center pr-4 py-3 ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex-shrink flex items-center pb-5">
          <Move
            className={`${isDummy ? 'invisible' : ''} text-bluegray-400`}
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
          <InputField label="User" className="">
            <RhfSelect
              className="w-full text-center"
              name={`${fieldName}.userId`}
              onFocus={onFocus}
              rules={{ required: !isDummy }}
              control={control}
              value={task.userId}
              options={[
                { label: 'a', value: 0 },
                { label: 'b', value: 1 },
              ]}
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
