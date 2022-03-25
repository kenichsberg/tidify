import { FC } from 'react'
import { Check } from 'react-feather'

import { OptionTagObject, Callback } from './types'

type Props = {
  thisOption: OptionTagObject
  checkedList: OptionTagObject[]
  callback: Callback
}

export const ListItemForMultiselect: FC<Props> = ({
  thisOption,
  checkedList,
  callback,
}) => {
  const isChecked = checkedList.some(
    (item) => item.value === thisOption.value && item.label === thisOption.label
  )
  return (
    <li
      className={`flex flex-none justify-between text-left px-3 py-2${
        isChecked ? ' bg-sky-100' : ' hover:bg-sky-100'
      }`}
      onClick={(event) => {
        event.stopPropagation()
        callback(thisOption, !isChecked)
      }}
    >
      <span> {thisOption.label} </span>
      {isChecked ? (
        <Check className="stroke-current text-teal-700" size={16} />
      ) : null}
    </li>
  )
}
