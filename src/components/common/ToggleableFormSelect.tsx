import { FC, MutableRefObject } from 'react'
import {
  InputField,
  SelectPickerWithRef,
  getOptionTagObjectByValue,
} from 'components/common'

import { OptionTagObject } from 'components/common/SelectPicker/types'

type Props = {
  isEditing: boolean
  name: string
  className?: string
  initialValue?: number | string
  options?: OptionTagObject[] | readonly OptionTagObject[]
  isNullable?: boolean
  formRef: MutableRefObject<any>
  label?: string
  wrapperClassName?: string
}

export const ToggleableFormSelect: FC<Props> = ({
  isEditing,
  name,
  className = '',
  options = [],
  initialValue = undefined,
  isNullable = true,
  formRef,
  label = '',
  wrapperClassName = '',
}) => {
  if (!isEditing) {
    return (
      <span className="truncate">
        {getOptionTagObjectByValue(initialValue, options)?.label ?? ''}
      </span>
    )
  }
  return (
    <InputField label={label} className={wrapperClassName}>
      <SelectPickerWithRef
        name={name}
        className={className}
        options={options}
        initialValue={initialValue}
        isNullable={isNullable}
        formRef={formRef}
      />
    </InputField>
  )
}
