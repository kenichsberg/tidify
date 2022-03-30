import { FC, useState, MutableRefObject } from 'react'
import { ChevronDown } from 'react-feather'

import { OptionTagObject } from './types'

type Props = {
  name: string
  className?: string
  options?: OptionTagObject[] | readonly OptionTagObject[]
  initialValue: number | string | undefined
  isNullable?: boolean
  formRef: MutableRefObject<any>
}

export const getOptionTagObjectByValue = (
  _value: number | string | undefined,
  options: OptionTagObject[] | readonly OptionTagObject[]
): OptionTagObject | undefined => {
  if (_value === undefined) return undefined
  // cast numeric string to number
  const value = !isNaN(+_value) ? +_value : _value

  return options?.find((option) => option.value === value)
}

export const SelectPickerWithRef: FC<Props> = ({
  name,
  className = '',
  options = [],
  initialValue,
  isNullable = true,
  formRef,
}) => {
  const [value, setValue] = useState<number | string | undefined>(initialValue)
  const onChange = (newValueObj: OptionTagObject | undefined) => {
    formRef.current = {
      ...formRef.current,
      [name]: newValueObj,
    }
    setValue(newValueObj?.value)
  }

  return (
    <div className="flex w-full relative">
      <select
        className={`appearance-none focus:outline-none${
          className === '' ? '' : ' ' + className
        }`}
        name={name}
        value={value}
        onChange={(event) =>
          onChange(getOptionTagObjectByValue(event.target.value, options))
        }
      >
        {isNullable ? <option value="">-----</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none flex flex-col justify-center w-5 text-bluegray-400">
        <ChevronDown size={16} />
      </div>
    </div>
  )
}
