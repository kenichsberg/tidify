import { useEffect } from 'react'
import { GetServerSidePropsResult } from 'next'
import { PrismaClient } from '@prisma/client'
import useSWR from 'swr'

import { Layout } from '@/components/layout'
import { ProjectsPage } from '@/components/project'
import { useProjects } from '@/contexts/project'
import { useTasks } from '@/contexts/task'
import { strToDate } from '@/utils/date'
import { fetcher, patchPropertyValues } from '@/utils/functions'

import {
  ProjectWithoutTechnicalColmuns,
  TaskWithoutTechnicalColmuns,
} from '@/components/project/types'

type Props = {
  projects: ProjectWithoutTechnicalColmuns[]
  tasks: TaskWithoutTechnicalColmuns[]
}

const prisma = new PrismaClient()

export default function IndexPage(props: Props): JSX.Element {
  const { data: projects, error: projectsError } = useSWR<
    ProjectWithoutTechnicalColmuns[]
  >('/api/projects', fetcher, { fallbackData: props.projects })
  const { data: tasks, error: tasksError } = useSWR<
    TaskWithoutTechnicalColmuns[]
  >('/api/tasks', fetcher, { fallbackData: props.tasks })
  console.log('pages', projects, tasks)

  const { setState: setProjects } = useProjects()
  const { setState: setTasks } = useTasks()

  useEffect(() => {
    const formattedData = projects?.map((project) => {
      if (
        typeof project.startAt === 'string' ||
        typeof project.endAt === 'string'
      ) {
        return patchPropertyValues<ProjectWithoutTechnicalColmuns>(
          project,
          strToDate,
          'startAt',
          'endAt'
        )
      }

      return project
    })
    setProjects?.(formattedData ?? [])
  }, [projects])

  useEffect(() => {
    setTasks?.(tasks ?? [])
  }, [tasks])

  if ((projectsError && !projects) || (tasksError && !tasks))
    return <div>error</div>

  return (
    <Layout currentPageName="Home">
      <ProjectsPage />
    </Layout>
  )
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const _projects = await prisma.project.findMany({
    select: {
      uuid: true,
      name: true,
      startAt: true,
      endAt: true,
      users: true,
      tasks: true,
    },
  })
  const projects = JSON.parse(JSON.stringify(_projects))

  const _tasks = await prisma.task.findMany({
    select: {
      uuid: true,
      name: true,
      rank: true,
      status: true,
      plannedDuration: true,
      actualDuration: true,
      user: true,
      project: true,
    },
    orderBy: [{ rank: 'asc' }, { projectId: 'asc' }],
  })
  const tasks = JSON.parse(JSON.stringify(_tasks))

  return { props: { projects, tasks } }
}
