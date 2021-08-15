import { ReactNode } from 'react'

type Props = {
  className?: string
  children?: ReactNode | ReactNode[]
  title?: string
  setClose?: () => void
}

export function ModalHeader({
  className,
  children,
  title,
  setClose,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {children || createDefaultChildren(title, setClose)}
    </div>
  )
}

function createDefaultChildren(title?: string, setClose?: () => void) {
  return (
    <>
      <span className="text-xl font-semibold">{title}</span>
      <button
        className="text-3xl font-semibold outline-none focus:outline-none mr-2"
        onClick={() => setClose && setClose()}
      >
        ×
      </button>
    </>
  )
}
