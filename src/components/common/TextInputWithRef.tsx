import { FC, useState, FocusEvent, FormEvent, MutableRefObject } from 'react'

type Props = {
  name: string
  className?: string
  initialValue?: string
  formRef: MutableRefObject<any>
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onInput?: (arg0?: FormEvent<HTMLInputElement>) => void
}

export const TextInputWithRef: FC<Props> = ({
  name,
  className = '',
  initialValue = '',
  formRef,
  onFocus,
  onBlur,
  onInput,
}) => {
  const [value, setValue] = useState<string>(initialValue)
  const onChange = (newValue: string) => {
    formRef.current = {
      ...formRef.current,
      [name]: newValue,
    }
    setValue(newValue)
  }
  return (
    <input
      type="text"
      className={`focus:outline-none${className === '' ? '' : ' ' + className}`}
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onInput={(event) => !!onInput && onInput(event)}
    />
  )
}
