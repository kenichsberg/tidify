import { FocusEvent } from 'react'
import {
  useController,
  FieldValues,
  UseControllerProps,
  UnpackNestedValue,
  PathValue,
  FieldPathValue,
  Path,
} from 'react-hook-form'
import { SelectPicker } from 'components/common'

import { OptionTagObject } from 'components/common/SelectPicker/types'

type RhfSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  options?: OptionTagObject[] | ReadonlyArray<OptionTagObject>
  value?: number | string | undefined
  withBlankOption?: boolean
  onFocus?: (arg0?: FocusEvent<HTMLSelectElement>) => void
  onBlur?: (arg0?: FocusEvent<HTMLSelectElement>) => void
  onChange?: (arg0?: string) => void
  rules?: any
}

export function RhfSelect<T extends FieldValues>({
  name,
  control,
  className,
  size = 'md',
  options,
  value,
  withBlankOption,
  onFocus,
  //onBlur,
  //onChange,
  rules,
}: RhfSelectProps<T>): JSX.Element {
  const {
    field: { ref, ...inputProps },
    //fieldState: { invalid, isTouched, isDirty },
    //formState: { touchedFields, dirtyFields },
  } = useController<T>({
    name,
    control,
    rules: rules,
    defaultValue: value as UnpackNestedValue<
      PathValue<T, FieldPathValue<T, Path<T>>>
    >,
    //onBlur: onBlur,
    //onChange: onChange,
  })

  return (
    <SelectPicker
      className={className}
      size={size}
      options={options}
      withBlankOption={withBlankOption}
      onFocus={onFocus}
      inputRef={ref}
      {...inputProps}
    />
  )
}
