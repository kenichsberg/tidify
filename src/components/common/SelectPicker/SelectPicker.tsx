import { useState, FocusEvent, Ref } from 'react'
import { ChevronDown } from 'react-feather'

import { OptionTagObject } from './types'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  options?: OptionTagObject[] | ReadonlyArray<OptionTagObject>
  value?: number | string | undefined
  withBlankOption?: boolean
  onFocus?: (arg0?: FocusEvent<HTMLSelectElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLSelectElement>) => void
  onChange?: (arg0?: string) => void
  inputRef?: Ref<HTMLSelectElement>
}

export function SelectPicker({
  name,
  className = '',
  size = 'md',
  options = [],
  value,
  withBlankOption = true,
  onFocus,
  onBlur,
  onChange,
  inputRef,
}: Props): JSX.Element {
  //const [value, setValue] = useState<number | string | undefined>(initialValue)
  //const onChange = (newValueObj: OptionTagObject | undefined) =>
  //setValue(newValueObj?.value)

  const sizeClass = getSizeClass(size)
  return (
    <div className="flex w-full relative">
      <select
        className={`appearance-none focus:outline-none ${
          className === '' ? '' : ' ' + className
        } ${sizeClass}`}
        name={name}
        value={value}
        onFocus={(event) => !!onFocus && onFocus(event)}
        onBlur={(event) => !!onBlur && onBlur(event)}
        onChange={(event) =>
          //onChange(getOptionTagObjectByValue(event.target.value, options))
          !!onChange && onChange(event.target.value)
        }
        ref={inputRef ? inputRef : undefined}
      >
        {withBlankOption ? <option value="">-----</option> : null}
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

/*
const getOptionTagObjectByValue = (
  _value: number | string | undefined,
  options: OptionTagObject[] | ReadonlyArray<OptionTagObject>
): OptionTagObject | undefined => {
  if (_value === undefined) return undefined
  // cast numeric string to number
  const value = !isNaN(+_value) ? +_value : _value

  return options?.find((option) => option.value === value)
}
*/
function getSizeClass(size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm':
      return 'text-xs h-3'
    case 'md':
      return ''
    case 'lg':
      return 'text-lg h-10'
  }
}
