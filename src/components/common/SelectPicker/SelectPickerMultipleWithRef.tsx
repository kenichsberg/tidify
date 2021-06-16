import { FC, useState, useEffect, MutableRefObject } from 'react'
import { X, ChevronDown } from 'react-feather'
import { DropdownListMultiselect } from './'

import { OptionTagObject } from './types'

type Props = {
  name: string
  className?: string
  options?: OptionTagObject[] | readonly OptionTagObject[]
  initialValues: OptionTagObject[]
  isNullable?: boolean
  formRef: MutableRefObject<any>
}

export const SelectPickerMultipleWithRef: FC<Props> = ({
  name,
  className = '',
  options = [],
  initialValues = [],
  isNullable = true,
  formRef,
}) => {
  const [isActive, setActive] = useState<boolean>(false)
  const [checkedList, setCheckedList] = useState<OptionTagObject[]>(
    initialValues
  )

  useEffect(() => {
    formRef.current = {
      ...formRef.current,
      [name]: checkedList,
    }
  }, [checkedList])

  const deleteOneOption = (deleteId: number | string | undefined) => () =>
    setCheckedList([
      ...checkedList.filter((element) => element.value !== deleteId),
    ])

  const callback = (thisOption: OptionTagObject, willCheck: boolean) => {
    if (willCheck) {
      setCheckedList([...checkedList, thisOption])
    } else {
      setCheckedList([
        ...checkedList.filter(
          (checkedItem) => checkedItem.value !== thisOption.value
        ),
      ])
    }
  }
  return (
    <div
      className={`relative flex flex-wrap justify-between items-center w-full h-full${
        className === '' ? '' : ' ' + className
      }`}
      onClick={() => setActive(!isActive)}
    >
      <div className="flex flex-wrap w-11/12">
        {checkedList ? (
          checkedList.map((checkedItem) => {
            const deleteOption = deleteOneOption(checkedItem.value)
            return (
              <span
                key={checkedItem.value}
                className="flex-0 flex items-center bg-bluegray-200 rounded-xl shadow p-2 text-xs mr-1 mb-1"
              >
                <span className="flex-0">{checkedItem.label}</span>
                <button
                  className="ml-1"
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteOption()
                  }}
                >
                  <X className="stroke-current text-gray-400" size={14} />
                </button>
              </span>
            )
          })
        ) : (
          <span>--------</span>
        )}
      </div>
      <div className="flex flex-col justify-center w-1/12">
        <ChevronDown size={16} />
      </div>
      <DropdownListMultiselect
        isActive={isActive}
        options={options}
        checkedList={checkedList}
        callback={callback}
        formRef={formRef}
      />
      <input
        type="hidden"
        name={name}
        value={checkedList.map((item) => item.value).join(',')}
      />
    </div>
  )
}
