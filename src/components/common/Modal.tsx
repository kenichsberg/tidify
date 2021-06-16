import { FC, ReactNode } from 'react'

type Props = {
  show: boolean
  setShow: (arg0: boolean) => void
  onClose?: () => void
  title?: string
  children?: ReactNode | ReactNode[]
}

export const Modal: FC<Props> = ({
  show,
  setShow,
  onClose,
  title,
  children,
}) => {
  if (!show) return null

  const closeModal = () => {
    onClose && onClose()
    setShow(false)
  }

  return (
    <>
      <div
        className="flex justify-center items-center fixed inset-0 z-50"
        onClick={() => closeModal()}
      >
        <div
          className="w-auto mx-auto max-w-7xl font-mono"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col w-full bg-bluegray-200 border-0 rounded-3xl shadow-lg">
            {/* header */}
            <div className="flex-1 flex justify-between items-start text-bluegray-600 border-b border-solid border-bluegray-300 p-5">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="text-3xl font-semibold outline-none focus:outline-none mr-2"
                onClick={() => closeModal()}
              >
                ×
              </button>
            </div>
            {/* body */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
