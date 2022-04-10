import { FC, ReactNode } from 'react'

type Props = {
  label?: string
  fieldStyle?: 'outlined' | 'filled'
  size?: 'sm' | 'md'
  className?: string
  disableDefaultClass?: boolean
  children: ReactNode | ReactNode[]
}

export const InputField: FC<Props> = ({
  label = '',
  fieldStyle = 'outlined',
  size = 'md',
  className = '',
  disableDefaultClass = false,
  children,
}) => {
  switch (fieldStyle) {
    case 'outlined': {
      const sizeClass = size === 'sm' ? ' h-9 px-2 py-1' : ' px-2 py-3'
      const fieldsetClass = disableDefaultClass
        ? className
        : `border border-gray-300 focus-within:border-teal-400 rounded-lg bg-white cursor-text${
            className === '' ? '' : ' ' + className
          }${sizeClass}`

      return (
        <>
          <fieldset className={fieldsetClass}>
            <legend className="text-xs text-bluegray-400 font-normal leading-skinny px-1 py-1">
              {label}
            </legend>
            <label>{children}</label>
          </fieldset>
        </>
      )
    }
    case 'filled': {
      const sizeClass = size === 'sm' ? ' h-9 px-1 py-1' : ' px-2 py-3'
      const fieldsetClass = disableDefaultClass
        ? className
        : `rounded-lg bg-bluegray-200 cursor-text${
            className === '' ? '' : ' ' + className
          }${sizeClass}`
      return (
        <>
          <fieldset className={fieldsetClass}>
            <legend className="text-xs text-bluegray-400 leading-skinny px-1">
              {label}
            </legend>
            {children}
          </fieldset>
        </>
      )
    }
  }
}
