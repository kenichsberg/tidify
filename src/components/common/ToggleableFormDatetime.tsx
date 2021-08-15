import { FC, MutableRefObject } from 'react'
import { DatetimePickerWithRef } from 'components/common'
import { formatDatetimeDisplay } from 'utils/date'

type Props = {
  isEditing: boolean
  name: string
  initialValue?: string
  formRef: MutableRefObject<any>
  label?: string
  className?: string
  size?: 'sm' | 'md'
}

export const ToggleableFormDatetime: FC<Props> = ({
  isEditing,
  name,
  initialValue = '',
  formRef,
  label = '',
  className = '',
  size = 'md',
}) => {
  if (!isEditing) {
    return (
      <span className="truncate">{formatDatetimeDisplay(initialValue)}</span>
    )
  }
  return (
    <DatetimePickerWithRef
      name={name}
      label={label}
      initialValue={initialValue}
      formRef={formRef}
      className={className}
      size={size}
    />
  )
}
