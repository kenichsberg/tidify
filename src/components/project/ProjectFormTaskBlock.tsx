import { useState } from 'react'
import { InputField, Input, SelectPicker } from 'components/common'
import { Move, Plus } from 'react-feather'

type Props = {
  isDummy?: boolean
  callback?: () => void
}

export function ProjectFormTaskBlock({
  isDummy = false,
  callback,
}: Props): JSX.Element {
  const onFocus = () => isDummy && callback && callback()

  return (
    <div className="flex flex-row justify-around items-center font-mono text-sm text-center text-bluegray-700 bg-bluegray-100 shadow hover:shadow-lg rounded-xl py-3">
      <div className="flex-shrink flex items-center">
        {getIndexElement(isDummy, 1)}
      </div>
      <div className="flex-grow max-w-md">
        <InputField label="Task Name" className="">
          <Input className="w-full" name="task" onFocus={onFocus} />
        </InputField>
      </div>
      <div className="flex-shrink w-24">
        <InputField label="Time" className="">
          <Input className="w-full" name="duration" onFocus={onFocus} />
        </InputField>
      </div>
      <div className="flex-shrink w-48">
        <InputField label="User" className="">
          <SelectPicker className="w-full" name="user" onFocus={onFocus} />
        </InputField>
      </div>
    </div>
  )
}

function getIndexElement(isDummy: boolean, index: number): JSX.Element {
  if (isDummy) {
    return <Plus size={16} />
  }
  return (
    <>
      <Move className="text-bluegray-400" size={16} />
      <span className="ml-2">{index}</span>
    </>
  )
}
