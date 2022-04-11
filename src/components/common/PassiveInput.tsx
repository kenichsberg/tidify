import { FocusEvent, MouseEvent, Ref } from 'react'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md'
  value: string
  onClick?: (arg0?: MouseEvent<HTMLInputElement>) => void
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  inputRef?: Ref<HTMLInputElement>
}

export function PassiveInput({
  name,
  className = '',
  size = 'md',
  value,
  onClick,
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
      onClick={(event) => onClick?.(event)}
      onFocus={(event) => onFocus?.(event)}
      onBlur={(event) => onBlur?.(event)}
      onInput={(event) => event.preventDefault()}
      ref={inputRef ? inputRef : undefined}
    />
  )
}
