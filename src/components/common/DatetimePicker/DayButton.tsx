type Props = {
  date: Date
  isCurrent: boolean
  isSelected: boolean
  disabled: boolean
  onClick: () => void
}

export function DayButton({
  date,
  isCurrent,
  isSelected,
  disabled,
  onClick,
}: Props): JSX.Element {
  const color = getColorClassName(disabled, isSelected, isCurrent)

  return (
    <button
      className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${color} mx-auto focus:outline-none`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {date.getDate()}
    </button>
  )
}

function getColorClassName(
  disabled: boolean,
  isSelected: boolean,
  isCurrent: boolean
): string {
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
