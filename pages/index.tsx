import { useEffect } from 'react'
import { GetServerSidePropsResult } from 'next'
import { PrismaClient } from '@prisma/client'
import useSWR from 'swr'
import { Layout } from 'components/layout'
import { ProjectsPage } from 'components/project'
import { useProjects } from '@/contexts/project'
import { strToDate } from 'utils/date'
import { fetcher, patchPropertyValues } from 'utils/functions'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'

type Props = {
  data: ProjectWithoutTechnicalColmuns[]
}

const prisma = new PrismaClient()

export default function IndexPage(props: Props): JSX.Element {
  const { data, error } = useSWR<ProjectWithoutTechnicalColmuns[]>(
    '/api/projects',
    fetcher,
    { fallbackData: props.data }
  )
  const { setState: setProjects } = useProjects()

  useEffect(() => {
    const formattedData = data?.map((datum) => {
      if (
        typeof datum.startAt === 'string' ||
        typeof datum.endAt === 'string'
      ) {
        return patchPropertyValues<ProjectWithoutTechnicalColmuns>(
          datum,
          strToDate,
          'startAt',
          'endAt'
        )
      }

      return datum
    })
    setProjects && setProjects(formattedData ?? [])
  }, [data])

  if (error && !data) return <div>error</div>

  return (
    <Layout currentPageName="Home">
      <ProjectsPage />
    </Layout>
  )
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const res = await prisma.project.findMany({
    select: {
      uuid: true,
      name: true,
      startAt: true,
      endAt: true,
      users: true,
      tasks: true,
    },
  })
  const data = JSON.parse(JSON.stringify(res))

  return { props: { data } }
}
