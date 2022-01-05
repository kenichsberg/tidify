import { ReactNode, useState } from 'react'

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalWindow,
} from '@/components/common'
import { AssignTasks, CreateProject } from '@/components/project'
import { TasksProvider, TaskUuidsProvider } from '@/contexts/project'
import { useProjectModal } from '@/contexts/project'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  //project: ProjectWithoutTechnicalColmuns | null
  show: boolean
  setClose: () => void
  //children?: ReactNode | ReactNode[]
}

export function ProjectFormModal({
  //project,
  show,
  setClose,
}: Props): JSX.Element {
  const [pageNo, setPageNo] = useState<number>(0)
  const { state: modalState } = useProjectModal()
  console.log(modalState)
  return (
    <Modal show={show}>
      <ModalOverlay onBackdrop={() => setClose()}>
        <ModalWindow className="w-11/12 max-w-7xl max-h-95vh flex flex-col bg-bluegray-200 border-0 rounded-3xl shadow-lg font-mono">
          {getContent(pageNo, modalState?.project ?? null, setPageNo, setClose)}
        </ModalWindow>
      </ModalOverlay>
    </Modal>
  )
}

function getContent(
  pageNo: number,
  project: ProjectWithoutTechnicalColmuns | null,
  setPageNo: (arg0: number) => void,
  setClose: () => void
): JSX.Element {
  const turnPage = (direction: NextPrev) => {
    const moveTo = direction === 'next' ? ++pageNo : --pageNo
    setPageNo(moveTo)
  }

  switch (pageNo) {
    case 0:
      return (
        <CreateProject
          project={project}
          setClose={() => setClose()}
          setPage={turnPage}
        />
      )
    case 1:
      return (
        <TasksProvider>
          <TaskUuidsProvider>
            <AssignTasks
              project={project}
              setClose={() => setClose()}
              setPage={turnPage}
            />
          </TaskUuidsProvider>
        </TasksProvider>
      )
    default:
      throw new Error('page no not exist')
  }
}
