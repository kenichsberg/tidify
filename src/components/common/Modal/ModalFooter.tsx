import { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode | ReactNode[]
  title?: string
  setClose?: () => void
}

export function ModalFooter({ className, children }: Props): JSX.Element {
  return <div className={className}>{children}</div>
}
