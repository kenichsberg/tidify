import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

type patchProps = {
  actualDuration: string
}

export default async function tasksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { uuid },
    body,
    method,
  } = req

  switch (method) {
    case 'PATCH':
      if (typeof uuid !== 'string') {
        res.status(400).end('invalid parameters')
        return
      }

      const { actualDuration: _actualDuration }: patchProps = JSON.parse(body)
      console.log(uuid, body)
      if (isNaN(parseInt(_actualDuration))) {
        res.status(400).end('invalid parameters')
        return
      }

      const actualDuration = +_actualDuration

      await prisma.task.update({
        where: { uuid },
        data: { actualDuration, status: 'DONE' },
      })

      res.status(204)
      break

    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
