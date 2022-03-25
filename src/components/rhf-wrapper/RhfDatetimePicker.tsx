import React from 'react'
import {
  useController,
  useForm,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { DatetimePicker } from 'components/common'

type RhfDatetimePickerProps<T extends FieldValues> = UseControllerProps<T> /*& {
  label?: string
}*/

export function RhfDatetimePicker<T extends FieldValues>({
  name,
  control,
}: //label,
RhfDatetimePickerProps<T>): JSX.Element {
  const {
    field: { ref, ...inputProps },
    //fieldState: { invalid, isTouched, isDirty },
    //formState: { touchedFields, dirtyFields },
  } = useController<T>({
    name,
    control,
    rules: { required: true },
    //defaultValue: '',
  })

  return <DatetimePicker inputRef={ref} {...inputProps} />
}
