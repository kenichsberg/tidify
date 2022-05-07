import {
  ProjectSection,
  PersonalTaskSection,
  TeammatesTaskSection,
} from '@/components/project'
import { ProjectModalProvider, useProjects } from '@/contexts/project'

export function ProjectsPage(): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) throw new Error('context value undefined')

  return (
    <ProjectModalProvider>
      <div className="flex flex-col lg:flex-row min-h-85vh">
        <div className="relative lg:w-3/5 py-2">
          <ProjectSection />
        </div>
        <div className="lg:w-2/5 flex flex-col py-2">
          <PersonalTaskSection />
          <div className="lg:flex-1 pt-4">
            <TeammatesTaskSection />
          </div>
        </div>
      </div>
    </ProjectModalProvider>
  )
}
