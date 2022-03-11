import { useState } from 'react'
import { mutate } from 'swr'
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import {
  InputField,
  SelectPicker,
  DatetimePicker,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/common'
import { RhfInput } from '@/components/rhf-wrapper'
import { useProjects } from '@/contexts/project'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { CreateProjectFormProps } from '@/components/project/types'
import { NextPrev } from '@/components/types'

type Props = {
  project: ProjectWithoutTechnicalColmuns | null
  setClose: () => void
  setPage: (arg0: NextPrev) => void
}

export function CreateProject({
  project,
  setClose,
  setPage,
}: Props): JSX.Element {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProjectFormProps>()
  const [startAt, setStartAt] = useState<Date | undefined>(project?.startAt)
  const { state: projects } = useProjects()

  if (!projects) {
    throw new Error('projects undefined')
  }

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
    console.log(projects, newProjects)

    mutate('/api/projects', newProjects, false)

    await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(record),
    })

    mutate('/api/projects')

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
              <div className="flex flex-row text-center mb-10">
                <div className="flex-1">
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
                <div className="flex-1">
                  <div className="w-11/12 max-w-xs mx-auto">
                    <InputField label="Start Date" className="">
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="startAt"
                        defaultValue={startAt}
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