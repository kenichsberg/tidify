import { useState, FocusEvent } from 'react'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md'
  initialValue?: string
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onChange?: (arg0?: string) => void
}

export function Input({
  name,
  className = '',
  size = 'md',
  initialValue = '',
  onFocus,
  onBlur,
  onChange,
}: Props): JSX.Element {
  const [value, setValue] = useState<string>(initialValue)
  const sizeClass = size === 'sm' ? ' text-xs h-3' : ''
  return (
    <input
      type="text"
      className={`focus:outline-none${
        className === '' ? '' : ' ' + className
      }${sizeClass}`}
      name={name}
      value={value}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onChange={(event) => {
        setValue(event.target.value)
        !!onChange && onChange(event.target.value)
      }}
    />
  )
}
