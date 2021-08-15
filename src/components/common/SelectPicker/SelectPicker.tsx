import { useState, FocusEvent } from 'react'
import { ChevronDown } from 'react-feather'

import { OptionTagObject } from './types'

type Props = {
  name: string
  className?: string
  options?: OptionTagObject[] | readonly OptionTagObject[]
  initialValue?: number | string | undefined
  isNullable?: boolean
  onFocus?: (arg0?: FocusEvent<HTMLSelectElement>) => void
}

const getOptionTagObjectByValue = (
  _value: number | string | undefined,
  options: OptionTagObject[] | readonly OptionTagObject[]
): OptionTagObject | undefined => {
  if (_value === undefined) return undefined
  // cast numeric string to number
  const value = !isNaN(+_value) ? +_value : _value

  return options?.find((option) => option.value === value)
}

export function SelectPicker({
  name,
  className = '',
  options = [],
  initialValue,
  isNullable = true,
  onFocus,
}: Props): JSX.Element {
  const [value, setValue] = useState<number | string | undefined>(initialValue)
  const onChange = (newValueObj: OptionTagObject | undefined) =>
    setValue(newValueObj?.value)

  return (
    <div className="flex w-full relative">
      <select
        className={`appearance-none focus:outline-none w-full ${
          className === '' ? '' : ' ' + className
        }`}
        name={name}
        value={value}
        onChange={(event) =>
          onChange(getOptionTagObjectByValue(event.target.value, options))
        }
        onFocus={(event) => !!onFocus && onFocus(event)}
      >
        {isNullable ? <option value="">-----</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-0 pointer-events-none flex flex-col justify-center w-5 text-bluegray-400">
        <ChevronDown size={16} />
      </div>
    </div>
  )
}
