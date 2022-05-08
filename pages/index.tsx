import { useEffect } from 'react'
import { GetStaticPropsResult } from 'next'
import Head from 'next/head'
import useSWR from 'swr'

import { Layout } from '@/components/layout'
import { ProjectsPage } from '@/components/project'
import { ProjectsProvider, useProjects } from '@/contexts/project'
import { TasksProvider, useTasks } from '@/contexts/task'
import { UsersProvider, useUsers } from '@/contexts/user'
import prisma from '@/lib/prisma'
import { strToDate } from '@/utils/date'
import { fetcher, patchPropertyValues } from '@/utils/functions'

import {
  ProjectWithoutTechnicalColmuns,
  TaskWithoutTechnicalColmuns,
  UserWithoutTechnicalColmuns,
} from '@/components/project/types'

type Props = {
  projects: ProjectWithoutTechnicalColmuns[]
  tasks: TaskWithoutTechnicalColmuns[]
  users: Array<UserWithoutTechnicalColmuns & { id: number }>
}

export default function IndexPage(props: Props): JSX.Element {
  const { data: projects, error: projectsError } = useSWR<Props['projects']>(
    '/api/projects',
    fetcher,
    { fallbackData: props.projects }
  )
  const { data: tasks, error: tasksError } = useSWR<Props['tasks']>(
    '/api/tasks',
    fetcher,
    { fallbackData: props.tasks }
  )

  const { data: users, error: usersError } = useSWR<Props['users']>(
    '/api/users',
    fetcher,
    { fallbackData: props.users }
  )

  const { setState: setProjects } = useProjects()
  const { setState: setTasks } = useTasks()
  const { setState: setUsers } = useUsers()

  const formattedProjects = projects?.map((project) => {
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
  useEffect(() => {
    setProjects?.(formattedProjects ?? [])
  }, [formattedProjects])

  useEffect(() => {
    setTasks?.(tasks ?? [])
  }, [tasks])

  useEffect(() => {
    setUsers?.(users ?? [])
  }, [users])

  if (
    (projectsError && !projects) ||
    (tasksError && !tasks) ||
    (usersError && !users)
  )
    return <div>error</div>

  return (
    <>
      <Head>
        <title>Tidify Demo | Home</title>
        <meta
          name="description"
          content="Task Manager Demo App built by Kenichi N."
        />
      </Head>
      <ProjectsProvider value={formattedProjects}>
        <TasksProvider value={tasks}>
          <UsersProvider value={users}>
            <Layout currentPageName="Home">
              <ProjectsPage />
            </Layout>
          </UsersProvider>
        </TasksProvider>
      </ProjectsProvider>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const _projects = await prisma.project.findMany({
    select: {
      uuid: true,
      name: true,
      startAt: true,
      endAt: true,
      users: true,
      tasks: true,
    },
    orderBy: [{ id: 'asc' }],
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

  const _users = await prisma.user.findMany({
    select: {
      uuid: true,
      name: true,
      role: true,
      dayOff: true,
      irregularDates: true,
    },
    orderBy: [{ id: 'asc' }],
  })
  const users = JSON.parse(JSON.stringify(_users))

  return {
    props: { projects, tasks, users },
    revalidate: 10,
  }
}
