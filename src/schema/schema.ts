import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import path from 'path'
import * as OperationTypes from 'schema/crud'
import * as ObjectTypes from 'schema/model'

export const schema = makeSchema({
  types: { OperationTypes, ObjectTypes },
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
      outputs: {
        typegen: path.join(
          process.cwd(),
          'src/schema/generated/typegen-nexus-plugin-prisma.d.ts'
        ),
      },
    }),
  ],
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema: path.join(process.cwd(), 'src/schema/generated/schema.graphql'),
    typegen: path.join(process.cwd(), 'src/schema/generated/nexusTypes.ts'),
  },
})
