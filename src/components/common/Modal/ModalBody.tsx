import { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode | ReactNode[]
}

export function ModalBody({ className, children }: Props): JSX.Element {
  return <div className={className}>{children}</div>
}
