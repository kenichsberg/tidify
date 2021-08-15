import { ReactNode } from 'react'

type Props = {
  show: boolean
  children?: ReactNode | ReactNode[]
}

export function Modal({ show, children }: Props): JSX.Element | null {
  if (!show) return null

  return <>{children}</>
}
