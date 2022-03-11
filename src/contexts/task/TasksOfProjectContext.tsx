import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { TaskFormProps } from '@/components/project/types'

type State = TaskFormProps[]

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const TasksOfProjectProvider = getContextProvider<State>(
  context,
  initialState
)

export const useTasksOfProject = getUseContext<State>(context)
