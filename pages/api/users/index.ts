import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

export default async function projectsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req

  switch (method) {
    case 'GET':
      const users = await prisma.user.findMany({
        select: {
          id: true,
          uuid: true,
          name: true,
          role: true,
          dayOff: true,
          irregularDates: true,
        },
        orderBy: [{ id: 'asc' }],
      })

      res.status(200).json(users)
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
