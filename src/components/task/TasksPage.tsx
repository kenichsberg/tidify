import { FC } from 'react'
import { NoData } from 'components/common'
import { TasksPerProject } from 'components/task'

import { ProjectSchema, TaskSchema, UserSchema } from 'schema/model/types'

type Props = {
  projects: (ProjectSchema & {
    tasks: TaskSchema[] | undefined
    users: UserSchema[]
  })[]
}

export const TasksPage: FC<Props> = ({ projects }) => (
  <>
    <h2 className="font-mono text-2xl font-bold text-bluegray-500 mt-1 mb-7 ml-4 md:ml-2 md:mb-9">
      Tasks
    </h2>
    {projects.length ? (
      projects?.map((project) => {
        return (
          <TasksPerProject
            key={project.id}
            _tasks={project.tasks}
            users={project.users}
            projectId={project.id}
            projectName={project.name}
          />
        )
      })
    ) : (
      <NoData dataType="projects" />
    )}
  </>
)
