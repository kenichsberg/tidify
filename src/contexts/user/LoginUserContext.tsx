import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { UserWithoutTechnicalColmuns } from '@/components/project/types'

type State = UserWithoutTechnicalColmuns

const initialState: State = {
  uuid: '',
  name: '',
  email: '',
  role: 'MEMBER',
  durationPerDay: 8,
  dayOff: ['SAT', 'SUN'],
}

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const LoginUserProvider = getContextProvider<State>(
  context,
  initialState
)

export const useLoginUser = getUseContext<State>(context)
