import { mutate } from 'swr'
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { Check } from 'react-feather'

import { InputField, SelectPicker } from '@/components/common'
import { RhfInput, RhfSelect } from '@/components/rhf-wrapper'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  task: TaskWithoutTechnicalColmuns
  index?: number
}

type FormProps = {
  actualDuration: number
}

export function PersonalTask({ task, index = 0 }: Props): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormProps>()
  const isTapped = false
  const color = isTapped
    ? ' bg-green-700 text-bluegray-100'
    : ' bg-bluegray-300 text-bluegray-200 hover:bg-bluegray-400 active:bg-green-600'

  const onSubmit: SubmitHandler<FormProps> = async (input: FormProps) => {
    await fetch(`/api/tasks/${task.uuid}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    //mutate(`/api/tasks/${task.uuid}`)
    mutate(`/api/tasks`)
  }

  const onError: SubmitErrorHandler<FormProps> = (errors) => console.log(errors)

  return (
    <form
      id="personalTask"
      onSubmit={(event) => {
        event.preventDefault()
        //@TODO handleSubmit(onSubmit, onError)()
      }}
    >
      <div
        className="h-40 flex flex-row justify-between items-center font-mono text-sm text-center text-bluegray-700 bg-gradient-to-br from-bluegray-100 to-bluegray-200 shadow rounded-xl my-2 px-5 py-2 transition duration-500 animate-slide-x"
        style={{ animationDelay: `${0.2 * index}s` }}
      >
        <div className="flex-shrink self-stretch w-2 h-full bg-bluegray-300 rounded-xl"></div>
        <div className="w-1/2 flex flex-col items-start pl-5">
          <div className="block w-4/5">
            <p className="text-bluegray-500 truncate">{task.project?.name}</p>
            <p className="font-bold truncate">{task.name}</p>
          </div>
        </div>
        <div className="w-2/6 flex flex-col items-center text-left pt-5 pb-3">
          <div className="flex-1 flex flex-row items-center">
            {/*
          <span className="text-bluegray-400 text-xs">planned: </span>
          <span className="pl-2">
            {task.plannedDuration} <span className="text-xs">h</span>
          </span>
            */}
            <InputField
              label="planned:"
              className="w-24 flex justify-center bg-transparent border-0"
            >
              <span className="">
                {task.plannedDuration} <span className="text-xs">h</span>
              </span>
            </InputField>
          </div>
          <div className="flex-shrink w-48 flex flex-col items-center">
            <InputField
              label="actual:"
              className="w-24 bg-bluegray-100 border-0"
            >
              <RhfInput
                type="number"
                className="w-full text-center bg-bluegray-100"
                name="actualDuration"
                rules={{ required: true }}
                control={control}
                value={task.actualDuration + ''}
              />
            </InputField>
            <span
              className={`text-red-500 text-xs ${
                errors?.actualDuration ? '' : 'invisible'
              }`}
            >
              This field is required
            </span>
          </div>
        </div>
        <button
          type="submit"
          form="personalTask"
          //@TODO className="w-1/6 self-stretch flex flex-col items-stretch text-bluegray-400 cursor-pointer focus:outline-none hover:text-emerald-600 active:text-bluegray-800"
          className="w-1/6 self-stretch flex flex-col items-stretch text-bluegray-400 focus:outline-none cursor-not-allowed"
        >
          <span className="pb-8 flex-grow flex items-end justify-start transition">
            <Check size={30} />
          </span>
        </button>
      </div>
      <DevTool control={control} />
    </form>
  )
}
