import { FocusEvent, Ref } from 'react'

type Props = {
  type?: 'text' | 'number'
  name: string
  value?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onChange?: (arg0?: string) => void
  inputRef?: Ref<HTMLInputElement>
}

export function Input({
  type = 'text',
  name,
  value = '',
  className = '',
  size = 'md',
  onFocus,
  onBlur,
  onChange,
  inputRef,
}: Props): JSX.Element {
  //const [value, setValue] = useState<string>(initialValue)
  const sizeClass = getSizeClass(size)
  return (
    <input
      type={type}
      className={`focus:outline-none ${
        className === '' ? '' : ' ' + className
      } ${sizeClass}`}
      name={name}
      value={value}
      onFocus={(event) => !!onFocus && onFocus(event)}
      onBlur={(event) => !!onBlur && onBlur(event)}
      onChange={(event) => {
        //setValue(event.target.value)
        !!onChange && onChange(event.target.value)
      }}
      ref={inputRef ? inputRef : undefined}
    />
  )
}

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
