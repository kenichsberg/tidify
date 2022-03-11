import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

type State = string[]

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const TaskUuidsProvider = getContextProvider<State>(
  context,
  initialState
)

export const useTaskUuids = getUseContext<State>(context)
