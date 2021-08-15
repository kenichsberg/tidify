import { NoData } from 'components/common'
import { useCache } from 'hooks/index'
import { GanttField, LabelField } from './'
import { ProjectSchema } from 'schema/model/types'

type Props = {
  project: Partial<ProjectSchema>
  chartStartDate: Date
  chartEndDate: Date
}

export function Chart({
  project,
  chartStartDate,
  chartEndDate,
}: Props): JSX.Element {
  useCache<number>('headerHeight', HEADER_HEIGHT)
  useCache<number>('rowHeight', ROW_HEIGHT)

  const tasks = project.tasks
  if (tasks === undefined) {
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
        <LabelField tasks={tasks} projectName={project?.name ?? ''} />
      </div>
      <div className="w-full overflow-x-auto">
        <GanttField
          tasks={tasks}
          chartStartDate={chartStartDate}
          chartEndDate={chartEndDate}
          projectStartDate={new Date(project.startAt)}
        />
      </div>
    </div>
  )
}

const HEADER_HEIGHT = 50
const ROW_HEIGHT = 80
const FOOTER_HEIGHT = 10
