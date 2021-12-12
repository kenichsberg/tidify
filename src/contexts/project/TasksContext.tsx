import { SetStateAction, createContext } from 'react'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/StateContextAbstraction'

import { TaskFormProps } from '@/components/project/types'

type State = TaskFormProps[]
//type SetState = Dispatch<SetStateAction<State>>

const initialState: State = []

const context = createContext<Partial<ContextProps<State>>>({
  state: initialState,
  setState: () => {},
})

export const TasksProvider = getContextProvider<State>(context, initialState)

export const useTasks = getUseContext<State>(context)
