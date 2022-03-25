import {
  ReactNode,
  useContext,
  useReducer,
  Reducer,
  Context,
  Dispatch,
} from 'react'

export interface ContextProps<State, Action> {
  state: State
  dispatch: Dispatch<Action>
}

type UseContext<State, Action> = () => Partial<ContextProps<State, Action>>

// ToDo: add memoize
export function getContextProvider<State, Action>(
  context: Context<Partial<ContextProps<State, Action>>>,
  reducer: Reducer<State, Action>,
  initialState: State
) {
  return (props: {
    children: ReactNode
    value?: ContextProps<State, Action>
  }): JSX.Element => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
      reducer,
      initialState
    )
    const value = props.value ?? { state, dispatch }

    return <context.Provider value={value}>{props.children}</context.Provider>
  }
}

export function getUseContext<State, Action>(
  context: any
): UseContext<State, Action> {
  return () => {
    const value = useContext(context)
    if (value === undefined) {
      throw new Error('context value should not be undefined')
    }
    return value as State
  }
}
