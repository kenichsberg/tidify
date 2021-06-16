import { objectType } from '@nexus/schema'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.startAt()
    t.model.endAt()
    t.model.users({ ordering: { id: true } })
    t.model.tasks({ ordering: { id: true } })
  },
})
