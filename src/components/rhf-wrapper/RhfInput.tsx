import { FocusEvent } from 'react'
import {
  useController,
  FieldValues,
  UseControllerProps,
  UnpackNestedValue,
  PathValue,
  FieldPathWithValue,
  Path,
} from 'react-hook-form'
import { Input } from 'components/common'

type RhfInputProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string
  size?: 'sm' | 'md'
  onFocus?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLInputElement>) => void
  onChange?: (arg0?: string) => void
  rules?: any
  //////////////////////
  value?: string
  //////////////////////
}

export function RhfInput<T extends FieldValues>({
  name,
  control,
  className,
  size = 'md',
  onFocus,
  //onBlur,
  //onChange,
  rules,
  //////////////////////
  value,
}: //////////////////////
RhfInputProps<T>): JSX.Element {
  const {
    field: { ref, ...inputProps },
    //fieldState: { invalid, isTouched, isDirty },
    //formState: { touchedFields, dirtyFields },
  } = useController<T>({
    name,
    control,
    rules: rules,
    defaultValue: value as UnpackNestedValue<
      PathValue<T, FieldPathWithValue<T, any, Path<T>>>
    >,
    //onBlur: onBlur,
    //onChange: onChange,
  })

  return (
    <Input
      className={className}
      size={size}
      onFocus={onFocus}
      inputRef={ref}
      {...inputProps}
    />
  )
}
