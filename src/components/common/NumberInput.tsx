import { FC } from 'react'

type Props = {
  name: string
  className?: string
  value: number
  setValue: (arg0: number) => void
}

const strToInt = (str: string) => (isNaN(+str) ? 0 : +str)

export const NumberInput: FC<Props> = ({
  name,
  className = 'input',
  value,
  setValue,
}) => (
  <input
    type="number"
    className={className + ' focus:outline-none'}
    name={name}
    value={value}
    onChange={(event) => setValue(strToInt(event.target.value))}
  />
)
