import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { TaskWithoutTechnicalColmuns } from '@/components/project/types'

type State = TaskWithoutTechnicalColmuns[]

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const TasksProvider = getContextProvider<State>(context, initialState)

export const useTasks = getUseContext<State>(context)
