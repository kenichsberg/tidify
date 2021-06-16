import { FC } from 'react'
import { NoData } from 'components/common'
import { useCache } from 'hooks/index'
import { NexusGenFieldTypes } from 'schema/generated/nexusTypes'
import { GanttField, LabelField } from './'

type Props = {
  tasks: NexusGenFieldTypes['Task'][]
}

export const Chart: FC<Props> = ({ tasks }) => {
  useCache<number>('headerHeight', HEADER_HEIGHT)
  useCache<number>('rowHeight', ROW_HEIGHT)

  const taskCount = tasks.length
  useCache<number>('chartHeight', HEADER_HEIGHT + ROW_HEIGHT * taskCount)

  return (
    <>
      <h2 className="font-mono text-2xl font-bold text-bluegray-500 mt-1 mb-7 ml-4 md:ml-2 md:mb-9">
        Schedule
      </h2>
      {tasks.length ? (
        <div className="flex">
          <div className="min-w-max max-w-min overflow-x-auto">
            <LabelField tasks={tasks} />
          </div>
          <div className="w-full overflow-x-auto">
            <GanttField tasks={tasks} />
          </div>
        </div>
      ) : (
        <NoData dataType="tasks" />
      )}
    </>
  )
}

const HEADER_HEIGHT = 50
const ROW_HEIGHT = 80
