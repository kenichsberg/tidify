import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'

type State = ProjectWithoutTechnicalColmuns[]

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const ProjectsProvider = getContextProvider<State>(context, initialState)

export const useProjects = getUseContext<State>(context)
