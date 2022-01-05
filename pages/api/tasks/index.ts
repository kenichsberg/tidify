import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type patchProps = {
  projectUuid: string
  tasks: Prisma.TaskCreateManyProjectInput[]
}

export default async function tasksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req

  switch (method) {
    case 'PATCH':
      const { projectUuid, tasks }: patchProps = JSON.parse(body)
      console.log(projectUuid, tasks)

      const project = await prisma.project.findUnique({
        where: {
          uuid: projectUuid,
        },
        select: { id: true },
      })

      if (project === null) {
        res.status(400).end('invalid parameters')
        return
      }

      const upsertTasks = await prisma.$transaction(
        tasks.map((task) =>
          prisma.task.upsert({
            where: { uuid: task.uuid },
            update: {
              rank: +task.rank,
              name: task.name,
              plannedDuration: task.plannedDuration ? +task.plannedDuration : 0,
              userId: +task.userId,
            },
            create: {
              uuid: task.uuid,
              rank: task.rank,
              name: task.name,
              status: 'READY',
              plannedDuration: task.plannedDuration,
              actualDuration: undefined,
              userId: task.userId,
              projectId: project.id,
            },
          })
        )
      )

      res.status(201).json(upsertTasks)
      break

    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
