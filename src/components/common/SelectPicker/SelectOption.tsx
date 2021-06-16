import { FC } from 'react'

interface OptionTagObject {
  id: number
  name: string
}

type Props = {
  name: string
  className?: string
  options?: OptionTagObject[] | readonly OptionTagObject[]
  defaultValue: number | undefined
  isNullable?: boolean
  setSelectedOption: (arg0: any) => void
}

const strToInt = (str: string) => (isNaN(+str) ? 0 : +str)

export const SelectOption: FC<Props> = ({
  name,
  className = '',
  options = [],
  defaultValue,
  isNullable = true,
  setSelectedOption,
}) => {
  const getOptionTagObjectById = (id: number) =>
    options?.find((option) => option.id === id)

  return (
    <select
      className={`appearance-none focus:outline-none${
        className === '' ? '' : ' ' + className
      }`}
      name={name}
      defaultValue={defaultValue}
      onChange={(event) =>
        setSelectedOption(getOptionTagObjectById(strToInt(event.target.value)))
      }
    >
      {isNullable ? <option value="">-----</option> : null}
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
