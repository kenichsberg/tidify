import { NoData } from '@/components/common'
import { ProjectCard } from '@/components/project'
import { useProjects } from '@/contexts/project'

export function GridView(): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) {
    throw new Error('context value undefined')
  }

  if (!projects.length) {
    return (
      <div className="m-10">
        <NoData dataType="projects" />
      </div>
    )
  }

  return (
    <div className="my-3 px-5 md:px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.uuid} project={project} />
        ))}
      </div>
    </div>
  )
}
