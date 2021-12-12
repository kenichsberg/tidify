import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'

type State = ProjectWithoutTechnicalColmuns | null

const initialState: State = null

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const ProjectProvider = getContextProvider<State>(context, initialState)

export const useProject = getUseContext<State>(context)
