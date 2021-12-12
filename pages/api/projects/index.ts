import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
import { strToDate } from '@/utils/date'

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
          tasks: true,
        },
      })
      res.status(200).json(projects)
      break

    case 'POST':
      const { name, startAt } = JSON.parse(body)
      const project: Prisma.ProjectCreateInput = {
        name: name,
        startAt: startAt,
        //endAt: null,
      }
      console.log(project)
      const createProject = await prisma.project.create({ data: project })
      res.status(201).json(createProject)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
