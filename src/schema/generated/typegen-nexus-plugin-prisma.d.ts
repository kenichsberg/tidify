import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Project: Prisma.Project
  Task: Prisma.Task
  IrregularDate: Prisma.IrregularDate
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'role' | 'projects' | 'tasks' | 'durationPerDay' | 'dayOff' | 'IrregularDate'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'role' | 'durationPerDay' | 'dayOff'
    }
    projects: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'name' | 'startAt' | 'endAt' | 'users' | 'tasks'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'startAt' | 'endAt'
    }
    tasks: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'user' | 'userId' | 'project' | 'projectId'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'userId' | 'projectId'
    }
    irregularDates: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'date' | 'type' | 'user' | 'userId'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'date' | 'type' | 'userId'
    }
  },
  User: {
    projects: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'name' | 'startAt' | 'endAt' | 'users' | 'tasks'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'startAt' | 'endAt'
    }
    tasks: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'user' | 'userId' | 'project' | 'projectId'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'userId' | 'projectId'
    }
    IrregularDate: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'date' | 'type' | 'user' | 'userId'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'date' | 'type' | 'userId'
    }
  }
  Project: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'role' | 'projects' | 'tasks' | 'durationPerDay' | 'dayOff' | 'IrregularDate'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'role' | 'durationPerDay' | 'dayOff'
    }
    tasks: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'user' | 'userId' | 'project' | 'projectId'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'rank' | 'name' | 'status' | 'plannedDuration' | 'actualDuration' | 'userId' | 'projectId'
    }
  }
  Task: {

  }
  IrregularDate: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    project: 'Project'
    projects: 'Project'
    task: 'Task'
    tasks: 'Task'
    irregularDate: 'IrregularDate'
    irregularDates: 'IrregularDate'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOneProject: 'Project'
    updateOneProject: 'Project'
    updateManyProject: 'AffectedRowsOutput'
    deleteOneProject: 'Project'
    deleteManyProject: 'AffectedRowsOutput'
    upsertOneProject: 'Project'
    createOneTask: 'Task'
    updateOneTask: 'Task'
    updateManyTask: 'AffectedRowsOutput'
    deleteOneTask: 'Task'
    deleteManyTask: 'AffectedRowsOutput'
    upsertOneTask: 'Task'
    createOneIrregularDate: 'IrregularDate'
    updateOneIrregularDate: 'IrregularDate'
    updateManyIrregularDate: 'AffectedRowsOutput'
    deleteOneIrregularDate: 'IrregularDate'
    deleteManyIrregularDate: 'AffectedRowsOutput'
    upsertOneIrregularDate: 'IrregularDate'
  },
  User: {
    id: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    email: 'String'
    role: 'Role'
    projects: 'Project'
    tasks: 'Task'
    durationPerDay: 'Int'
    dayOff: 'DayOfWeek'
    IrregularDate: 'IrregularDate'
  }
  Project: {
    id: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    startAt: 'DateTime'
    endAt: 'DateTime'
    users: 'User'
    tasks: 'Task'
  }
  Task: {
    id: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    rank: 'Int'
    name: 'String'
    status: 'Status'
    plannedDuration: 'Int'
    actualDuration: 'Int'
    user: 'User'
    userId: 'Int'
    project: 'Project'
    projectId: 'Int'
  }
  IrregularDate: {
    id: 'Int'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    date: 'DateTime'
    type: 'DayType'
    user: 'User'
    userId: 'Int'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Project: Typegen.NexusPrismaFields<'Project'>
  Task: Typegen.NexusPrismaFields<'Task'>
  IrregularDate: Typegen.NexusPrismaFields<'IrregularDate'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  