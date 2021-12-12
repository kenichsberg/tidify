import { useState, useEffect, Fragment, createContext, useContext } from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { ModalBody, ModalFooter, ModalHeader } from '@/components/common'
import { ProjectFormTaskBlock, BetweenTasks } from '@/components/project'
import { TasksProvider, useTasks } from '@/contexts/project'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { AssignTasksFormProps } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  project: ProjectWithoutTechnicalColmuns | null
  //title: string
  setClose: () => void
  setPage: (arg0: NextPrev) => void
}

export function AssignTasks({
  project,
  //title,
  setClose,
  setPage,
}: Props): JSX.Element {
  const methods = useForm<AssignTasksFormProps>(/*{ shouldUnregister: true }*/)
  const { state: tasks, setState: setTasks } = useTasks()
  if (!tasks || !setTasks) {
    throw new Error('tasks undefined')
  }
  console.log('assignTasks:', tasks)

  const length = tasks.length

  const onSubmit: SubmitHandler<AssignTasksFormProps> = (data) => {
    console.log(data)
    //setPage('next')
  }
  const onError: SubmitErrorHandler<AssignTasksFormProps> = (errors) =>
    console.log(errors)

  useEffect(() => {
    if (tasks.length) {
      return
    }
    setTasks([
      { uuid: uuidv4(), name: '', duration: 0, user: '' },
      { uuid: uuidv4(), name: '', duration: 0, user: '' },
    ])
  }, [tasks])
  /*
  if (!tasks.length) {
    setTasks([
      { id: uuidv4(), name: '', duration: 0, user: undefined },
      { id: uuidv4(), name: '', duration: 0, user: undefined },
    ])
  }
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
              methods.handleSubmit(onSubmit, onError)()
            }}
          >
            <div className="flex flex-col items-stretch">
              <div className="w-full xl:w-11/12 max-w-5xl mx-auto">
                {tasks.map((task, index) => {
                  const isBottom = index === length - 1
                  return (
                    <Fragment key={task.uuid}>
                      <BetweenTasks index={index} />
                      <ProjectFormTaskBlock
                        isDummy={isBottom}
                        task={task}
                        index={index}
                        callback={
                          isBottom
                            ? () =>
                                setTasks([
                                  ...tasks,
                                  {
                                    uuid: uuidv4(),
                                    name: '',
                                    duration: 0,
                                    user: '',
                                  },
                                ])
                            : undefined
                        }
                      />
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
