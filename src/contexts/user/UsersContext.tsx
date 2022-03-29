import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { UserWithoutTechnicalColmuns } from '@/components/project/types'

type State = Array<UserWithoutTechnicalColmuns & { id: number }>

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const UsersProvider = getContextProvider<State>(context, initialState)

export const useUsers = getUseContext<State>(context)
