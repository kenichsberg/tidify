import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'

type putProps = {
  projectUuid: string
  tasks: Prisma.TaskCreateManyProjectInput[]
}

/*
type deleteProps = {
  deleteIds: string[]
}
 */

export default async function tasksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req

  switch (method) {
    case 'GET':
      {
        const tasks = await prisma.task.findMany({
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
          orderBy: [{ projectId: 'asc' }, { rank: 'asc' }],
        })
        res.status(200).json(tasks)
      }
      break

    case 'PUT': {
      const { projectUuid, tasks }: putProps = JSON.parse(body)
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

      // Beforehand, delete records that don't exist in request, but do exist on DB.
      const oldTasks = await prisma.task.findMany({
        where: {
          project: { uuid: projectUuid },
        },
      })
      const deleteIds = oldTasks
        .filter((oldTask) => !tasks.find((task) => task.uuid === oldTask.uuid))
        .map((oldTask) => oldTask.uuid)

      await prisma.$transaction(
        deleteIds.map((deleteId) =>
          prisma.task.delete({
            where: { uuid: deleteId },
          })
        )
      )

      console.log(
        'newIds: ',
        tasks.map((task) => task.uuid),
        'oldIds: ',
        oldTasks.map((oldTask) => oldTask.uuid),
        'deleteIds: ',
        deleteIds
      )

      // Then, upsert records
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
              rank: +task.rank,
              name: task.name,
              status: 'READY',
              plannedDuration: task.plannedDuration ? +task.plannedDuration : 0,
              actualDuration: undefined,
              userId: +task.userId,
              projectId: project.id,
            },
          })
        )
      )
      const successIds = upsertTasks.map((task) => task.uuid)

      const data = { taskUuids: successIds, projectUuid }
      res.status(201).json({ data })
      break
    }

    /*
    case 'DELETE':
      const { deleteIds }: deleteProps = JSON.parse(body)
      await prisma.$transaction(
        deleteIds.map((deleteId) =>
          prisma.task.delete({
            where: { uuid: deleteId },
          })
        )
      )

      res.status(204)
      break
     */

    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
