import { useDrop } from 'react-dnd'
import { Plus } from 'react-feather'
import { v4 as uuidv4 } from 'uuid'

import { useTasksOfProject, useTaskUuids } from '@/contexts/task'

import { dndTypes } from '@/components/project/constants'
import { TaskProps } from '@/components/project/types'

type Props = {
  index: number
}

export function BetweenTasks({ index }: Props): JSX.Element {
  const { state: tasks, setState: setTasks } = useTasksOfProject()
  const { state: taskUuids, setState: setTaskUuids } = useTaskUuids()
  if (!tasks || !setTasks) {
    throw new Error('Tasks context undefined')
  }
  if (!taskUuids || !setTaskUuids) {
    throw new Error('TaskUuids context undefined')
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: dndTypes.TASK,
      drop: (_, monitor) => {
        const props = monitor.getItem() as TaskProps
        const task = props.task

        const oldIndex = tasks.indexOf(task)
        const newIndex = index
        const removed = tasks.filter((val) => val.uuid !== task.uuid)
        const actualIndex = oldIndex < newIndex ? newIndex - 1 : newIndex
        const newTasks = [
          ...removed.slice(0, actualIndex),
          task,
          ...removed.slice(actualIndex),
        ]

        setTasks(newTasks)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks, index]
  )

  const onClick = () => {
    const newUuid = uuidv4()
    setTasks([
      ...tasks.slice(0, index),
      { uuid: newUuid, name: '', plannedDuration: 0, userId: undefined },
      ...tasks.slice(index),
    ])
    setTaskUuids([...taskUuids, newUuid])
  }

  return (
    <div
      ref={drop}
      className={`h-5 relative flex flex-row justify-center group ${
        isOver ? 'bg-red-200' : ''
      }`}
    >
      <button
        type="button"
        className="absolute -top-2/3 sm:-top-1/3 sm:left-1/2 sm:opacity-0 group-hover:opacity-100 flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center bg-cyan-500 text-bluegray-100 focus:outline-none z-[3] transition"
        onClick={onClick}
      >
        <Plus size={24} />
      </button>
    </div>
  )
}
