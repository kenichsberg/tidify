import { NoData } from 'components/common'
import { Chart } from 'components/schedule'
import { getMaxDate, getMinDate } from 'utils/date'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  projects: ProjectSchema[]
}

export function ChartView({ projects }: Props): JSX.Element {
  const projectStartDates = projects.map((project) => new Date(project.startAt))
  const chartStartDate = getMinDate(projectStartDates)
  const projectEndDates = projects.map((project) => new Date(project.endAt))
  const chartEndDate = getMaxDate(projectEndDates)

  if (!projects.length) {
    return (
      <div className="m-10">
        <NoData dataType="projects" />
      </div>
    )
  }
  return (
    <div className="my-3 px-5 md:px-6 py-4">
      <div className="">
        {projects.map((project) => (
          <Chart
            key={project.id}
            project={project}
            chartStartDate={chartStartDate}
            chartEndDate={chartEndDate}
          />
        ))}
      </div>
    </div>
  )
}
