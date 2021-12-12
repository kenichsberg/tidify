import { FC } from 'react'

import {
  ProjectSection,
  PersonalTaskSection,
  TeamsTaskSection,
} from '@/components/project'
import {
  ProjectModalProvider,
  ProjectsProvider,
  useProjects,
} from '@/contexts/project'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'

/*
type Props = {
  projects: ProjectWithoutTechnicalColmuns[]
}
*/

export function ProjectsPage(): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) throw new Error('context value undefined')

  return (
    <ProjectModalProvider>
      <div className="flex flex-col lg:flex-row min-h-85vh">
        <div className="lg:w-3/5 p-3">
          <ProjectSection />
        </div>
        <div className="lg:w-2/5 flex flex-col">
          <div className="p-3">
            <PersonalTaskSection
              task={
                projects[0]?.tasks.length ? projects[0].tasks[0] : undefined
              }
            />
          </div>
          <div className="lg:flex-1 p-3">
            <TeamsTaskSection tasks={projects[0]?.tasks ?? []} />
          </div>
        </div>
      </div>
    </ProjectModalProvider>
  )
}
