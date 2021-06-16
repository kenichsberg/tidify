import { FC, MutableRefObject } from 'react'
import { InputField, TextInputWithRef } from 'components/common'

type Props = {
  isEditing: boolean
  name: string
  className?: string
  initialValue?: string
  formRef: MutableRefObject<any>
  label?: string
  wrapperClassName?: string
}

export const ToggleableFormText: FC<Props> = ({
  isEditing,
  name,
  className = '',
  initialValue = '',
  formRef,
  label = '',
  wrapperClassName = '',
}) => {
  if (!isEditing) {
    return <span className="truncate">{initialValue}</span>
  }
  return (
    <InputField label={label} className={wrapperClassName}>
      <TextInputWithRef
        name={name}
        className={className}
        initialValue={initialValue}
        formRef={formRef}
      />
    </InputField>
  )
}
