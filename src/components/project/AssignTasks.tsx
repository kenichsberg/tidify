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
import { useTasks, useTaskUuids } from '@/contexts/project'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { AssignTasksFormProps } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  project: ProjectWithoutTechnicalColmuns | null
  setClose: () => void
  setPage: (arg0: NextPrev) => void
}

export function AssignTasks({
  project,
  setClose,
  setPage,
}: Props): JSX.Element {
  const methods = useForm<AssignTasksFormProps>()

  const { state: tasks, setState: setTasks } = useTasks()
  const { state: taskUuids, setState: setTaskUuids } = useTaskUuids()
  if (!tasks || !setTasks) {
    throw new Error('Tasks context undefined')
  }
  if (!setTaskUuids || !taskUuids) {
    throw new Error('TaskUuids context undefined')
  }
  console.log('assignTasks:', tasks, taskUuids)

  const onSubmit: SubmitHandler<AssignTasksFormProps> = async (
    input: AssignTasksFormProps
  ) => {
    console.log(input)
    const tasks = input.tasks.filter((fieldsObj) => !fieldsObj.isDummy)
    const data = {
      projectUuid: project?.uuid ?? uuidv4(),
      tasks: tasks,
    }

    /*
    const index = projects.findIndex(
      (element) => element.uuid === project?.uuid
    )

    let newProjects = []
    if (index !== -1) {
      newProjects = [...projects]
      newProjects[index] = record
    } else {
      newProjects = [...projects, record]
    }
    console.log(projects, newProjects)

    mutate('/api/projects', newProjects, false)
*/

    await fetch('/api/projects', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })

    //mutate('/api/tasks')

    setPage('next')
  }

  const onError: SubmitErrorHandler<AssignTasksFormProps> = (errors) =>
    console.log(errors)

  useEffect(() => {
    if (tasks.length && taskUuids.length) return

    if (project?.tasks.length) {
      setTasks(project.tasks)
      setTaskUuids(project.tasks.map((task) => task.uuid))
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
              methods.handleSubmit(onSubmit, onError)()
            }}
          >
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
          className="rounded-xl h-10 w-20 flex justify-center items-center hover:bg-bluegray-500 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
          onClick={() => setPage('prev')}
        >
          &lt; Back
        </button>
        <button
          type="submit"
          form="assignTask"
          className="rounded-xl h-10 w-20 flex justify-center items-center hover:bg-bluegray-500 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        >
          Save
        </button>
      </ModalFooter>
    </>
  )
}
