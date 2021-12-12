import { useState } from 'react'

import { NoData } from '@/components/common'
import { Task } from '@/components/project'

import { TaskComponentProps } from '@/components/project/types'

type Props = {
  tasks: TaskComponentProps[]
}

export function TeamsTaskSection({ tasks }: Props): JSX.Element {
  return (
    <section className="lg:h-full bg-gray-100 rounded-3xl overflow-auto px-2 sm:px-4 py-8 lg:py-6">
      <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
        Teammates' Tasks
      </h2>
      {getTasks(tasks)}
    </section>
  )
}

function getTasks(tasks: TaskComponentProps[]): JSX.Element {
  if (!tasks.length) {
    return (
      <div className="m-10">
        <NoData dataType="tasks" />
      </div>
    )
  }

  const tasksVDom = tasks.map((task) => (
    <div key={task.id}>
      <Task task={task} />
    </div>
  ))
  return <>{tasksVDom}</>
}
