import { createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { UserWithoutTechnicalColmuns } from '@/components/project/types'

type State = UserWithoutTechnicalColmuns

const initialState: State = {
  uuid: 'fa87edeb-aeca-4b7d-b631-35e95a815fde',
  name: 'Joey',
  email: 'joey@mail.com',
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
