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
          tasks: true,
        },
        orderBy: [
          {
            id: 'asc',
          },
        ],
      })

      res.status(200).json(projects)
      break

    case 'POST':
      const { uuid, name, startAt }: Prisma.ProjectCreateInput =
        JSON.parse(body)
      console.log(uuid, name, startAt)

      const createProject = await prisma.project.upsert({
        where: { uuid },
        update: { name, startAt },
        create: { name, startAt },
      })

      res.status(201).json(createProject)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
