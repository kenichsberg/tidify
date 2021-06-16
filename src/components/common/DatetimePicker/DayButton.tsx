import { FC } from 'react'

type Props = {
  date: Date
  isCurrent: boolean
  isSelected: boolean
  disabled: boolean
  onClick: () => void
}

export const DayButton: FC<Props> = ({
  date,
  isCurrent,
  isSelected,
  disabled,
  onClick,
}) => {
  const color = getColorClassName(disabled, isSelected, isCurrent)

  return (
    <button
      className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center${color} mx-auto`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {date.getDate()}
    </button>
  )
}

const getColorClassName = (
  disabled: boolean,
  isSelected: boolean,
  isCurrent: boolean
): string => {
  switch (true) {
    case disabled:
      return ' text-bluegray-300 cursor-default'
    case isSelected:
      return ' bg-bluegray-900 text-bluegray-100'
    case isCurrent:
      return ' bg-bluegray-300 hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100'
    default:
      return ' hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100'
  }
}
