import { useDrag } from 'react-dnd'
import { useFormContext } from 'react-hook-form'
import { Move, Plus } from 'react-feather'
//import { DevTool } from '@hookform/devtools'

import { InputField, SelectPicker } from '@/components/common'
import { RhfInput, RhfSelect } from '@/components/rhf-wrapper'
import { dndTypes } from '@/components/project/constants'
import { TaskFormProps } from '@/components/project/types'

type Props = {
  isDummy?: boolean
  task: TaskFormProps
  index: number
  callback?: () => void
}

export function ProjectFormTaskBlock({
  isDummy = false,
  task,
  index,
  callback,
}: Props): JSX.Element {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dndTypes.TASK,
    item: {
      task: task,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const {
    control,
    formState: { errors },
  } = useFormContext()

  const onFocus = () => isDummy && callback && callback()

  return (
    <div className="flex flex-row justify-between items-center font-mono text-sm text-bluegray-700">
      <div className="flex-shrink flex justify-center items-center flex bg-bluegray-50 shadow rounded-full w-16 h-16">
        <div className="flex items-center text-bluegray-500">
          {getIndexElement(isDummy, index)}
        </div>
      </div>
      <div
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
        <div className="flex-grow max-w-md">
          <input type="hidden" value={index} />
          <InputField label="Task Name" className="">
            <RhfInput
              className="w-full"
              name={`name-${task.uuid}`}
              onFocus={onFocus}
              rules={{ required: isDummy ? false : true }}
              control={control}
              value={task.name}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors[`name-${task.uuid}`] ? '' : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
        <div className="flex-shrink w-48 flex flex-col items-center">
          <InputField label="Duraiton" className="w-24">
            <RhfInput
              className="w-full"
              name={`duration-${task.uuid}`}
              onFocus={onFocus}
              rules={{ required: isDummy ? false : true }}
              control={control}
              value={task.duration + ''}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors[`duration-${task.uuid}`] ? '' : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
        <div className="flex-shrink w-48">
          <InputField label="User" className="">
            <RhfSelect
              className="w-full"
              name={`user-${task.uuid}`}
              onFocus={onFocus}
              rules={{ required: isDummy ? false : true }}
              control={control}
              value={task.user}
              options={[
                { label: 'a', value: 'a' },
                { label: 'b', value: 'b' },
              ]}
            />
          </InputField>
          <span
            className={`text-red-500 text-xs ${
              errors[`user-${task.uuid}`] ? '' : 'invisible'
            }`}
          >
            This field is required
          </span>
        </div>
      </div>
      {
        //<DevTool control={control} />
      }
    </div>
  )
}

function getIndexElement(isDummy: boolean, index: number): JSX.Element {
  if (isDummy) {
    return (
      <>
        {
          //<Move className="invisible" size={16} />
        }
        <Plus size={16} />
      </>
    )
  }
  return (
    <>
      {
        //<Move className="text-bluegray-400" size={16} />
        //<span className="ml-2">{index + 1}</span>
      }
      <span>{index + 1}</span>
    </>
  )
}
