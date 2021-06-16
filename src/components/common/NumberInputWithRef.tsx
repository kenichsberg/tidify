import { FC, useState, FocusEvent, FormEvent, MutableRefObject } from 'react'

type Props = {
  name: string
  className?: string
  size?: 'sm' | 'md'
  initialValue?: number
  formRef: MutableRefObject<any>
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onInput?: (arg0?: FormEvent<HTMLInputElement>) => void
}

const strToInt = (str: string) => (isNaN(+str) ? 0 : +str)

export const NumberInputWithRef: FC<Props> = ({
  name,
  className = '',
  size = 'md',
  initialValue = 0,
  formRef,
  onFocus,
  onBlur,
  onInput,
}) => {
  const [value, setValue] = useState<number>(initialValue)
  const onChange = (newValue: number) => {
    formRef.current = {
      ...formRef.current,
      [name]: newValue,
    }
    setValue(newValue)
  }

  const sizeClass = size === 'sm' ? ' text-xs h-4' : ''

  return (
    <input
      type="number"
      className={`focus:outline-none${
        className === '' ? '' : ' ' + className
      }${sizeClass}`}
      name={name}
      value={value}
      onChange={(event) => onChange(strToInt(event.target.value))}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onInput={(event) => !!onInput && onInput(event)}
    />
  )
}
