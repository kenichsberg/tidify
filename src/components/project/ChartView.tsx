import { NoData } from '@/components/common'
import { Chart } from '@/components/schedule'
import { getMaxDate, getMinDate } from '@/utils/date'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'
import { useProjects } from '@/contexts/project'

type ProjectWithNotNullEndAt = Omit<ProjectWithoutTechnicalColmuns, 'endAt'> & {
  endAt: Date
}

export function ChartView(): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) {
    throw new Error('context value undefined')
  }

  const projectStartDates = projects
    .filter((project) => !!project.startAt)
    .map((project) => new Date(project.startAt))
  const chartStartDate = getMinDate(projectStartDates)

  if (!projects.length) {
    return (
      <div className="m-10">
        <NoData dataType="projects" />
      </div>
    )
  }

  if (!chartStartDate) {
    throw new Error(
      `project.startAt should not be undefined\n` +
        `projects uuids:\n ${projects.map((p) => p.uuid).join('\n')}`
    )
  }

  const projectEndDates = projects
    .filter((project): project is ProjectWithNotNullEndAt => !!project.endAt)
    .map((project) => new Date(project.endAt))
  const chartEndDate = getMaxDate(projectEndDates)

  return (
    <div className="md:px-6 py-4">
      <Chart chartStartDate={chartStartDate} chartEndDate={chartEndDate} />
    </div>
  )
}
