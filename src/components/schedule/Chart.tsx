import { NoData } from '@/components/common'
import { GanttField, LabelField } from '@/components/schedule'
import { useCache } from '@/hooks/index'
import { useTasks } from '@/contexts/task'

type Props = {
  chartStartDate: Date
  chartEndDate: Date | undefined
}

const HEADER_HEIGHT = 50
const ROW_HEIGHT = 80
const FOOTER_HEIGHT = 10

export function Chart({ chartStartDate, chartEndDate }: Props): JSX.Element {
  const { state: tasks } = useTasks()
  if (!tasks) throw new Error('context value undefined')

  useCache<number>('headerHeight', HEADER_HEIGHT)
  useCache<number>('rowHeight', ROW_HEIGHT)

  if (!tasks.length) {
    return <NoData dataType="tasks" />
  }
  const taskCount = tasks.length
  useCache<number>(
    'chartHeight',
    HEADER_HEIGHT + ROW_HEIGHT * taskCount + FOOTER_HEIGHT
  )

  return (
    <div className="flex pb-10">
      <div className="min-w-max max-w-min overflow-x-auto">
        <LabelField />
      </div>
      <div className="w-full overflow-x-auto">
        <GanttField
          chartStartDate={chartStartDate}
          chartEndDate={chartEndDate}
        />
      </div>
    </div>
  )
}
