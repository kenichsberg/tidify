import { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode | ReactNode[]
}

export function ModalWindow({ className, children }: Props): JSX.Element {
  return (
    <div className={className} onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  )
}
