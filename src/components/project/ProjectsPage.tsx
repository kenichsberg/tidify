import { FC } from 'react'
import { ProjectSection, CurrentTaskSection } from 'components/project'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  projects: ProjectSchema[]
}

export const ProjectsPage: FC<Props> = ({ projects }) => (
  <div className="flex flex-col lg:flex-row min-h-85vh">
    <div className="lg:w-3/5 p-3">
      <ProjectSection projects={projects} />
    </div>
    <div className="lg:w-2/5 flex flex-col">
      <div className="p-3">
        <CurrentTaskSection
          currentTask={projects[0]?.tasks.length ? projects[0].tasks[0] : null}
        />
      </div>
      <div className="lg:flex-1 p-3">
        <section className="lg:h-full bg-gray-100 rounded-3xl overflow-auto px-2 sm:px-4 py-8 lg:py-6">
          <h2 className="font-mono text-lg font-bold text-bluegray-500 mt-1 mb-7 ml-4">
            Pending
          </h2>
        </section>
      </div>
    </div>
  </div>
)
