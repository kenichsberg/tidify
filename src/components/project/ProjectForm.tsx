import { useState, Fragment } from 'react'
import {
  InputField,
  Input,
  SelectPicker,
  DatetimePicker,
} from 'components/common'
import { ProjectFormTaskBlock } from 'components/project'
import { Grid, Plus } from 'react-feather'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  project: ProjectSchema | null
}

export function ProjectForm({ project }: Props): JSX.Element {
  const [taskReactKeys, setTaskReactKeys] = useState<number[]>([0])
  const keys = [...taskReactKeys]
  const maxKey = taskReactKeys.length ? Math.max(...taskReactKeys) : -1
  const length = taskReactKeys.length

  return (
    <form
      onSubmit={() => {
        console.log('a')
      }}
    >
      <div className="flex flex-col items-stretch">
        <div className="w-full xl:w-11/12 max-w-5xl mx-auto">
          <div className="flex flex-row mb-10">
            <div className="flex-1">
              <div className="w-11/12 max-w-lg mx-auto">
                <InputField label="Project Name" className="">
                  <Input name="project" className="w-full" />
                </InputField>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-11/12 max-w-xs mx-auto">
                <DatetimePicker
                  label="Start Date"
                  value=""
                  setValue={() => {
                    console.log('aaa')
                  }}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-3xl px-5 py-3">
            {taskReactKeys.map((key, index) => {
              const isBottom = index === length - 1
              return (
                <Fragment key={key}>
                  <ProjectFormTaskBlock
                    isDummy={isBottom || undefined}
                    callback={
                      isBottom
                        ? () => setTaskReactKeys([...taskReactKeys, maxKey + 1])
                        : undefined
                    }
                  />
                  <div className="h-5 relative flex flex-row justify-center group">
                    <button
                      type="button"
                      className="absolute -top-1/3 left-1/2 opacity-0 group-hover:opacity-100 flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center bg-cyan-500 text-bluegray-100 focus:outline-none"
                      onClick={() =>
                        setTaskReactKeys(insertToArray(keys, maxKey + 1, index))
                      }
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </form>
  )
}

function insertToArray(array: any[], value: any, index: number) {
  return [...array.slice(0, index + 1), value, ...array.slice(index + 1)]
}

function concatNewKey(isBottom: boolean) {
  if (isBottom)
    return function appendKey(array: any[], value: any, _: number) {
      return [...array, value]
    }
  return insertToArray
}
