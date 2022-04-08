import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'
import { ManHourCalculator } from '@/utils/date'

export default async function projectsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { uuid },
    method,
  } = req

  switch (method) {
    case 'PATCH':
      if (typeof uuid !== 'string') {
        res.status(400).end('invalid parameters')
        return
      }

      const project = await prisma.project.findUnique({
        where: { uuid },
        select: {
          startAt: true,
          tasks: true,
        },
      })
      if (!project) {
        res.status(404).end('not found')
        return
      }

      const totalManHour = project.tasks.reduce(
        (acc, current) => acc + current.plannedDuration,
        0
      )

      const calc = new ManHourCalculator()
      const endAt = calc.getEndDatetimeByManHour(
        new Date(project.startAt),
        totalManHour
      )

      await prisma.project.update({
        where: { uuid },
        data: { endAt },
      })

      res.status(204)
      break

    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
