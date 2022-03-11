import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { UserWithoutTechnicalColmuns } from '@/components/project/types'

type State = UserWithoutTechnicalColmuns

const initialState: State = {
  uuid: 'b51765e9-09c1-4cad-ad84-f40997387b37',
  name: 'user1',
  email: 'a@b.c',
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
