import { queryType, mutationType } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ pagination: true, filtering: true, ordering: true })
    t.crud.project()
    t.crud.projects({
      pagination: true,
      filtering: true,
      ordering: true,
    })
    t.crud.task()
    t.crud.tasks({
      pagination: true,
      filtering: true,
      ordering: true,
    })
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
    t.crud.createOneProject()
    t.crud.updateOneProject()
    t.crud.deleteOneProject()
    t.crud.createOneTask()
    t.crud.updateOneTask()
    t.crud.deleteOneTask()
  },
})
