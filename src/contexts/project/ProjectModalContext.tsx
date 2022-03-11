import { Reducer, createContext } from 'react'
import { ProjectWithoutTechnicalColmuns } from '@/components/project/types'

import {
  getContextProvider,
  getUseContext,
  ContextProps,
} from '@/contexts/ReducerContextAbstraction'

type State = {
  showModal: boolean
  project: ProjectWithoutTechnicalColmuns | null
}
type Action =
  | {
      type: 'open'
      data: State['project']
    }
  | { type: 'close' }
  | {
      type: 'setNewProject'
      data: State['project']
    }

const initialState: State = {
  showModal: false,
  project: null,
}

const context = createContext<Partial<ContextProps<State, Action>>>({
  state: initialState,
  dispatch: () => {},
})

export const ProjectModalProvider = getContextProvider<State, Action>(
  context,
  reducer,
  { showModal: false, project: null }
)

export const useProjectModal = getUseContext<State, Action>(context)

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return {
        showModal: true,
        project: action.data,
      }
    case 'close':
      return {
        showModal: false,
        project: null,
      }
    case 'setNewProject':
      return {
        showModal: true,
        project: action.data,
      }
    default:
      throw new Error('invalid action type')
  }
}
