export interface OptionTagObject {
  label: string
  value: number | string
}

export interface Callback {
  (option: OptionTagObject, willCheck: boolean): void
}
