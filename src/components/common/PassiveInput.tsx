import { FocusEvent, Ref } from 'react'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md'
  value: string
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  inputRef?: Ref<HTMLInputElement>
}

export function PassiveInput({
  name,
  className = '',
  size = 'md',
  value,
  onFocus,
  onBlur,
  inputRef,
}: Props): JSX.Element {
  const sizeClass = size === 'sm' ? ' text-xs h-3' : ''
  return (
    <input
      type="text"
      className={`focus:outline-none ${
        className === '' ? '' : ' ' + className
      } ${sizeClass}`}
      name={name}
      value={value}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onInput={(event) => event.preventDefault()}
      ref={inputRef ? inputRef : undefined}
    />
  )
}
