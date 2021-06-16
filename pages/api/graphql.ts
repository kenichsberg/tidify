import { ApolloServer } from 'apollo-server-micro'
import prisma from 'schema/prisma'
import { schema } from 'schema/schema'

const server = new ApolloServer({
  schema,
  context: (req: any) => ({
    ...req,
    prisma,
  }),
  tracing: process.env.NODE_ENV === 'development',
})
const handler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
