import { FC } from 'react'
import { ProjectCard } from 'components/project'

import { ProjectSchema } from 'schema/model/types'

type Props = {
  projects: ProjectSchema[]
}

export const ProjectsPage: FC<Props> = ({ projects }) => (
  <>
    <h2 className="font-mono text-2xl font-bold text-bluegray-500 mt-1 mb-7 ml-4 md:ml-2 md:mb-9">
      Projects
    </h2>
    <div className="bg-bluegray-200 shadow rounded-3xl my-3 px-5 md:px-10 py-4 md:py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <ProjectCard project={null} />
      </div>
    </div>
  </>
)
