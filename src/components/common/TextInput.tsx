import { FC, FocusEvent, FormEvent } from 'react'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md'
  value: string
  setValue?: (arg0: string) => void
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onInput?: (arg0?: FormEvent<HTMLInputElement>) => void
}

export const TextInput: FC<Props> = ({
  name,
  className = '',
  size = 'md',
  value,
  setValue,
  onFocus,
  onBlur,
  onInput,
}) => {
  const sizeClass = size === 'sm' ? ' text-xs h-3' : ''
  return (
    <input
      type="text"
      className={`focus:outline-none${
        className === '' ? '' : ' ' + className
      }${sizeClass}`}
      name={name}
      value={value}
      onChange={(event) => !!setValue && setValue(event.target.value)}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onInput={(event) => !!onInput && onInput(event)}
    />
  )
}
