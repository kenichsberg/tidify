import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { v4 as uuidv4 } from 'uuid'

import {
  InputField,
  DatetimePicker,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/common'
import { RhfInput } from '@/components/rhf-wrapper'
import { useProjects, useProjectModal } from '@/contexts/project'
import { strToDate } from '@/utils/date'
import { patchPropertyValues } from '@/utils/functions'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { CreateProjectFormProps } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  //project: ProjectWithoutTechnicalColmuns | null
  setClose: () => void
  setPage: (arg0: NextPrev) => void
}

export function CreateProject({
  //project,
  setClose,
  setPage,
}: Props): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateProjectFormProps>()
  //const [startAt, setStartAt] = useState<Date | undefined>(project?.startAt)
  const [startAt, setStartAt] = useState<Date | undefined>(undefined)
  const { state: projects } = useProjects()
  const { state: modalState, dispatch: dispatchModalState } = useProjectModal()

  if (!projects) {
    throw new Error('projects undefined')
  }
  if (!modalState || !dispatchModalState) {
    throw new Error('modalState undefined')
  }

  //let project: ProjectWithoutTechnicalColmuns | null = modalState.project
  const project = modalState.project
    ? patchPropertyValues<ProjectWithoutTechnicalColmuns>(
        modalState.project,
        strToDate,
        'startAt'
      )
    : null
  useEffect(() => {
    setStartAt(modalState.project?.startAt)

    if (!modalState.project?.startAt) return
    setValue('startAt', modalState.project?.startAt)
  }, [project])

  /*
  const onSubmit: SubmitHandler<CreateProjectFormProps> = async (input) => {
    const record: ProjectWithoutTechnicalColmuns = {
      ...input,
      uuid: project?.uuid ?? uuidv4(),
      endAt: project?.endAt ?? null,
      users: project?.users ?? [],
      tasks: project?.tasks ?? [],
    }

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

    mutate('/api/projects', newProjects, false)

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(record),
    })
    const res = (await response.json()) as {
      data: ProjectWithoutTechnicalColmuns
    }
    const newProject = res.data
    dispatchModalState({ type: 'setNewProject', data: newProject })

    mutate('/api/projects')

    setPage('next')
  }
*/
  const onSubmit: SubmitHandler<CreateProjectFormProps> = async (input) => {
    console.log('submit')
    const data: ProjectWithoutTechnicalColmuns = {
      ...input,
      uuid: project?.uuid ?? uuidv4(),
      endAt: project?.endAt ?? null,
      users: project?.users ?? [],
      tasks: project?.tasks ?? [],
    }
    dispatchModalState({ type: 'setNewProject', data })

    setPage('next')
  }

  const onError: SubmitErrorHandler<CreateProjectFormProps> = (errors) =>
    console.log(errors)

  return (
    <>
      <ModalHeader
        className="sticky flex-1 flex justify-between items-start text-bluegray-600 border-b border-solid border-bluegray-300 p-5"
        title={project?.name ?? 'Create New Project'}
        setClose={setClose}
      />
      <ModalBody className="overflow-y-auto flex-grow py-12">
        <form
          id="createProject"
          onSubmit={(event) => {
            event.preventDefault()
            handleSubmit(onSubmit, onError)()
          }}
        >
          <div className="flex flex-col items-stretch">
            <div className="w-full xl:w-11/12 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row text-center">
                <div className="flex-1 mb-8">
                  <div className="w-11/12 max-w-lg mx-auto">
                    <InputField label="Project Name">
                      <RhfInput
                        name="name"
                        control={control}
                        className="w-full text-center"
                        rules={{ required: true }}
                        value={project?.name}
                      />
                    </InputField>

                    <span
                      className={`text-red-500 text-sm ${
                        errors.name ? '' : 'invisible'
                      }`}
                    >
                      This field is required
                    </span>
                  </div>
                </div>
                <div className="flex-1 mb-8">
                  <div className="w-11/12 max-w-lg md:max-w-xs mx-auto">
                    <InputField label="Start Date" omitLabelTag={true}>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="startAt"
                        defaultValue={project?.startAt}
                        data-onChange={(date: Date | undefined) =>
                          setStartAt(date)
                        }
                        render={({ field: { name, value, ref, onChange } }) => (
                          <DatetimePicker
                            className="text-center"
                            name={name}
                            inputRef={ref}
                            _value={value}
                            _onChange={onChange}
                          />
                        )}
                      />
                    </InputField>
                    <span
                      className={`text-red-500 text-sm ${
                        errors.startAt ? '' : 'invisible'
                      }`}
                    >
                      This field is required
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter className="sticky flex-1 flex justify-between items-start text-bluegray-600 border-t border-solid border-bluegray-300 p-5">
        <button type="button" className="invisible"></button>
        <button
          type="submit"
          form="createProject"
          className="rounded-xl h-10 w-20 flex justify-center items-center hover:bg-bluegray-500 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        >
          Next
        </button>
      </ModalFooter>
    </>
  )
}
