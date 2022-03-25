import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function projectsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req

  switch (method) {
    case 'GET':
      const projects = await prisma.project.findMany({
        //include: { users: true, tasks: true },
        select: {
          uuid: true,
          name: true,
          startAt: true,
          endAt: true,
          users: true,
          tasks: {
            include: { user: true },
          },
        },
        orderBy: [{ id: 'asc' }],
      })

      res.status(200).json(projects)
      break

    case 'POST':
      const { uuid, name, startAt }: Prisma.ProjectCreateInput =
        JSON.parse(body)
      console.log(uuid, name, startAt)

      const upsertedProject = await prisma.project.upsert({
        where: { uuid },
        update: { name, startAt },
        create: { name, startAt },
      })

      const newProject = await prisma.project.findUnique({
        where: { id: upsertedProject.id },
        select: {
          uuid: true,
          name: true,
          startAt: true,
          endAt: true,
          users: true,
          tasks: true,
        },
      })

      //res.status(201).json(uuid)
      res.status(200).json({ data: newProject })
      break

    case 'DELETE':
      const { uuid: projectUuid }: { uuid: string } = JSON.parse(body)
      console.log(projectUuid)
      if (!projectUuid) {
        res.status(400).end('invalid parameters')
        return
      }

      const project = await prisma.project.findUnique({
        where: { uuid: projectUuid },
      })
      if (!project) {
        res.status(404).end('not found')
        return
      }

      const deleteTasks = prisma.task.deleteMany({
        where: { projectId: project.id },
      })
      const deleteProject = prisma.project.delete({
        where: { id: project.id },
      })

      await prisma.$transaction([deleteTasks, deleteProject])

      res.status(204)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
