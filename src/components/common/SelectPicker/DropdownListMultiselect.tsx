import { FC, MutableRefObject } from 'react'
import { ListItemForMultiselect } from './'

import { OptionTagObject, Callback } from './types'

type Props = {
  isActive: boolean
  options?: OptionTagObject[] | readonly OptionTagObject[]
  checkedList: OptionTagObject[]
  formRef: MutableRefObject<any>
  callback: Callback
}

export const DropdownListMultiselect: FC<Props> = ({
  isActive,
  options = [],
  checkedList,
  callback,
}) => {
  if (!isActive) return null

  return (
    <div className="absolute origin-bottom top-12 w-full rounded-lg shadow-lg bg-white py-2">
      <ul className="divide-y">
        {options === undefined
          ? null
          : options.map((option) => (
              <ListItemForMultiselect
                key={option.value}
                thisOption={option}
                checkedList={checkedList}
                callback={callback}
              />
            ))}
      </ul>
    </div>
  )
}
