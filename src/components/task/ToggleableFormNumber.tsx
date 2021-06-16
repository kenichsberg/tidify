import { FC, MutableRefObject } from 'react'
import { InputField, NumberInputWithRef } from 'components/common'

type Props = {
  isEditing: boolean
  name: string
  className?: string
  initialValue?: number
  formRef: MutableRefObject<any>
  label?: string
  wrapperClassName?: string
  size?: 'sm' | 'md'
}

export const ToggleableFormNumber: FC<Props> = ({
  isEditing,
  name,
  className = '',
  initialValue = 0,
  formRef,
  label = '',
  wrapperClassName = '',
  size = 'md',
}) => {
  if (!isEditing) {
    return (
      <span className="bg-bluegray-200 rounded text-bluegray-400 truncate px-4 py-1">
        {initialValue} h
      </span>
    )
  }
  return (
    <InputField
      fieldStyle={'filled'}
      label={label}
      className={wrapperClassName}
      size={size}
    >
      <NumberInputWithRef
        name={name}
        className={className}
        initialValue={initialValue}
        formRef={formRef}
        size={size}
      />
      <span className="text-xs text-bluegray-400 ml-1">h</span>
    </InputField>
  )
}
