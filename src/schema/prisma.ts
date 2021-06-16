import { PrismaClient } from '@prisma/client'

//const log_level = process.env.NODE_ENV === 'production' ? 'error' : 'info'
const log_level = 'info'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: [log_level],
  })
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: [log_level],
    })
  }

  // @ts-ignore
  prisma = global.prisma
}

export default prisma
