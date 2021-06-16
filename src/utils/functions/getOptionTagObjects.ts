import { OptionTagObject } from 'components/common/SelectPicker/types'

type HasLabel<T> = {
  [S in keyof T]: string
}
type HasValue<T> = {
  [S in keyof T]: string | number
}

export function getOptionTagObjects<Type>(
  rawObjects: (HasLabel<Type> & HasValue<Type> & any)[],
  keyOfLabel: keyof Type,
  keyOfValue: keyof Type
): OptionTagObject[] {
  return rawObjects.map((rawObject) => ({
    label: rawObject[keyOfLabel],
    value: rawObject[keyOfValue],
  }))
}
