import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.email()
    t.model.role()
    t.model.projects()
    t.model.tasks()
    t.model.durationPerDay()
    t.model.dayOff()
  },
})
