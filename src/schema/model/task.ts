import { objectType } from '@nexus/schema'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.rank()
    t.model.status()
    t.model.name()
    t.model.plannedDuration()
    t.model.actualDuration()
    t.model.user()
    t.model.userId()
    t.model.project()
    t.model.projectId()
  },
})
