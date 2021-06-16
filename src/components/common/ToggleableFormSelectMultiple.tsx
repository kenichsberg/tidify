import { FC, MutableRefObject } from 'react'
import {
  InputField,
  SelectPickerMultipleWithRef,
  getOptionTagObjectByValue,
} from 'components/common'

import { OptionTagObject } from 'components/common/SelectPicker/types'

type Props = {
  isEditing: boolean
  name: string
  className?: string
  initialValues: OptionTagObject[]
  options?: OptionTagObject[] | readonly OptionTagObject[]
  isNullable?: boolean
  formRef: MutableRefObject<any>
  label?: string
  wrapperClassName?: string
}

export const ToggleableFormSelectMultiple: FC<Props> = ({
  isEditing,
  name,
  className = '',
  options = [],
  initialValues = [],
  isNullable = true,
  formRef,
  label = '',
  wrapperClassName = '',
}) => {
  if (!isEditing) {
    return (
      <span className="truncate">
        {initialValues
          .map(
            (optionTagObj) =>
              getOptionTagObjectByValue(optionTagObj.value, options)?.label ??
              undefined
          )
          .filter((optionTagLabel) => optionTagLabel !== undefined)
          .join(', ')}
      </span>
    )
  }
  return (
    <InputField label={label} className={wrapperClassName}>
      <SelectPickerMultipleWithRef
        name={name}
        className={className}
        options={options}
        initialValues={initialValues}
        isNullable={isNullable}
        formRef={formRef}
      />
    </InputField>
  )
}
