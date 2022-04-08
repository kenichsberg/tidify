import { useEffect, Fragment } from 'react'
import { mutate } from 'swr'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { ModalBody, ModalFooter, ModalHeader } from '@/components/common'
import { ProjectFormTaskBlock, BetweenTasks } from '@/components/project'
import { useProjectModal } from '@/contexts/project'
import { useTasksOfProject, useTaskUuids } from '@/contexts/task'
//import { ManHourCalculator, formatDatetimeDisplay } from '@/utils/date'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { AssignTasksFormProps } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  //project: ProjectWithoutTechnicalColmuns | null
  setClose: () => void
  setPage: (arg0: NextPrev) => void
}

export function AssignTasks({
  //project,
  setClose,
  setPage,
}: Props): JSX.Element {
  const methods = useForm<AssignTasksFormProps>()

  const { state: tasks, setState: setTasks } = useTasksOfProject()
  const { state: taskUuids, setState: setTaskUuids } = useTaskUuids()
  const { state: modalState } = useProjectModal()

  if (!tasks || !setTasks) {
    throw new Error('Tasks context undefined')
  }
  if (!setTaskUuids || !taskUuids) {
    throw new Error('TaskUuids context undefined')
  }
  if (!modalState) {
    throw new Error('modalState undefined')
  }

  const project = modalState.project as
    | (ProjectWithoutTechnicalColmuns & { startAt: string })
    | null

  const onSubmit: SubmitHandler<AssignTasksFormProps> = async (
    input: AssignTasksFormProps
  ) => {
    const newTasks = input.tasks.filter((fieldsObj) => !fieldsObj.isDummy)
    const data = {
      projectUuid: project?.uuid ?? uuidv4(),
      tasks: newTasks,
    }

    /*
    mutate('/api/tasks', @TODO, false)
    */

    const response = await fetch('/api/tasks', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    mutate('/api/tasks')

    const res = (await response.json()) as {
      data: { taskuuIds: string[]; projectUuid: string }
    }
    const projectUuid = res.data.projectUuid

    await fetch(`/api/projects/${projectUuid}`, {
      method: 'PATCH',
    })
    mutate('/api/projects')

    setClose()
  }

  const onError: SubmitErrorHandler<AssignTasksFormProps> = (errors) =>
    console.log(errors)

  useEffect(() => {
    if (tasks.length && taskUuids.length) return

    if (project?.tasks.length) {
      const uuid = uuidv4()
      setTasks([
        ...project.tasks.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0)),
        { uuid, name: '', plannedDuration: 0, userId: undefined },
      ])
      setTaskUuids([...project.tasks.map((task) => task.uuid), uuid])
      return
    }

    const uuid1 = uuidv4()
    const uuid2 = uuidv4()
    setTasks([
      { uuid: uuid1, name: '', plannedDuration: 0, userId: undefined },
      { uuid: uuid2, name: '', plannedDuration: 0, userId: undefined },
    ])
    setTaskUuids([uuid1, uuid2])
  }, [tasks])

  /*
  const calc = new ManHourCalculator()
  let endAt = new Date()
  useEffect(() => {
    if (!project?.startAt) return

    const totalManHour = tasks.reduce(
      (acc, current) => acc + current.plannedDuration,
      0
    )
    endAt = calc.getEndDatetimeByManHour(
      new Date(project.startAt),
      totalManHour
    )
  }, [project?.startAt])
   */

  return (
    <>
      <ModalHeader
        className="sticky flex-1 flex justify-between items-start text-bluegray-600 border-b border-solid border-bluegray-300 p-5"
        title={`Assign Tasks to ${project?.name}`}
        setClose={setClose}
      />
      <ModalBody className="overflow-y-auto flex-grow py-12">
        <FormProvider {...methods}>
          <form
            id="assignTask"
            onSubmit={(event) => {
              event.preventDefault()
              //@TODO methods.handleSubmit(onSubmit, onError)()
            }}
          >
            {/*
            <div className="flex flex-col items-stretch">
              <div className="w-full xl:w-11/12 max-w-5xl mx-auto">
                <p>Project starts: {formatDatetimeDisplay(project?.startAt)}</p>
                <p>ends: {formatDatetimeDisplay(endAt?.toISOString())}</p>
              </div>
            </div>
                  */}
            <div className="flex flex-col items-stretch">
              <div className="w-full xl:w-11/12 max-w-5xl mx-auto">
                {tasks.map((task, index, array) => {
                  const isBottom = index === array.length - 1
                  return (
                    <Fragment key={task.uuid}>
                      <BetweenTasks index={index} />
                      <ProjectFormTaskBlock isDummy={isBottom} index={index} />
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </form>
        </FormProvider>
      </ModalBody>
      <ModalFooter className="sticky flex-1 flex justify-between items-start text-bluegray-600 border-t border-solid border-bluegray-300 p-5">
        <button
          type="button"
          //@TODO className="rounded-xl h-10 w-20 flex justify-center items-center hover:bg-bluegray-500 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
          //@TODO onClick={() => setPage('prev')}
          className="rounded-xl h-10 w-20 flex justify-center items-center focus:outline-none cursor-not-allowed"
        >
          &lt; Back
        </button>
        <button
          type="submit"
          form="assignTask"
          //@TODO className="rounded-xl h-10 w-20 flex justify-center items-center hover:bg-bluegray-500 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
          className="rounded-xl h-10 w-20 flex justify-center items-center focus:outline-none cursor-not-allowed"
        >
          Save
        </button>
      </ModalFooter>
    </>
  )
}
