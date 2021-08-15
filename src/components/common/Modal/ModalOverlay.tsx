import { ReactNode } from 'react'

type Props = {
  onBackdrop?: () => void
  children?: ReactNode | ReactNode[]
  className?: string
}

export function ModalOverlay({
  onBackdrop,
  children,
  className = 'opacity-25 fixed inset-0 z-40 bg-black',
}: Props): JSX.Element {
  return (
    <>
      <div
        className="flex justify-center items-center fixed inset-0 z-50"
        onClick={() => onBackdrop && onBackdrop()}
      >
        {children}
      </div>
      <div className={className}></div>
    </>
  )
}
