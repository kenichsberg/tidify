import { objectType } from '@nexus/schema'

export const IrregularDate = objectType({
  name: 'IrregularDate',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.date()
    t.model.type()
    t.model.user()
    t.model.userId()
  },
})
