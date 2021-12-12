import { useDrop } from 'react-dnd'
import { Plus } from 'react-feather'
import { v4 as uuidv4 } from 'uuid'

import { useTasks } from '@/contexts/project'

import { dndTypes } from '@/components/project/constants'
import { TaskProps } from '@/components/project/types'

type Props = {
  index: number
}

export function BetweenTasks({ index }: Props): JSX.Element {
  const { state: tasks, setState: setTasks } = useTasks()
  if (!tasks || !setTasks) {
    throw new Error('tasks undefined')
  }
  console.log('betweentasks:', tasks)

  const [{ isOver /*, canDrop*/ }, drop] = useDrop(
    () => ({
      accept: dndTypes.TASK,
      drop: (item, monitor) => {
        if (!tasks || !setTasks) {
          throw new Error('tasks undefined')
        }

        const props = monitor.getItem() as TaskProps
        const task = props.task

        console.log('drop:, ', item, monitor)
        console.log('betweentasks, drop:', tasks)

        const oldIndex = tasks.indexOf(task)
        const newIndex = index
        console.log(oldIndex, newIndex)

        const removed = tasks.filter((val) => val.uuid !== task.uuid)
        const actualIndex = oldIndex < newIndex ? newIndex - 1 : newIndex
        const newTasks = [
          ...removed.slice(0, actualIndex),
          task,
          ...removed.slice(actualIndex),
        ]
        console.log({ old: tasks, removed: removed, new: newTasks })
        setTasks(newTasks)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks, index]
  )

  return (
    <div
      ref={drop}
      className={`h-5 relative flex flex-row justify-center group ${
        isOver ? 'bg-red-200' : ''
      }`}
    >
      <button
        type="button"
        className="absolute -top-1/3 left-1/2 opacity-0 group-hover:opacity-100 flex-shrink-0 rounded-full h-8 w-8 flex items-center justify-center bg-cyan-500 text-bluegray-100 focus:outline-none"
        onClick={() =>
          setTasks([
            ...tasks.slice(0, index),
            { uuid: uuidv4(), name: '', duration: 0, user: '' },
            ...tasks.slice(index),
          ])
        }
      >
        <Plus size={20} />
      </button>
    </div>
  )
}
