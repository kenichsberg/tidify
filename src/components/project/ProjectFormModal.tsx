import { ReactNode, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalWindow,
} from 'components/common'

type Props = {
  show: boolean
  setShow: (arg0: boolean) => void
  title: string
  children?: ReactNode | ReactNode[]
}

export function ProjectFormModal({
  show,
  setShow,
  title,
  children,
}: Props): JSX.Element {
  return (
    <Modal show={show}>
      <ModalOverlay onBackdrop={() => setShow(false)}>
        <ModalWindow className="w-11/12 max-w-7xl max-h-95vh flex flex-col bg-bluegray-200 border-0 rounded-3xl shadow-lg font-mono">
          <ModalHeader
            className="sticky flex-1 flex justify-between items-start text-bluegray-600 border-b border-solid border-bluegray-300 p-5"
            title={title}
            setClose={() => setShow(false)}
          />
          <ModalBody className="overflow-y-auto flex-grow py-12">
            {children}
          </ModalBody>
        </ModalWindow>
      </ModalOverlay>
    </Modal>
  )
}
