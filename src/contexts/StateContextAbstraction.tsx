import {
  ReactNode,
  useContext,
  useState,
  Context,
  Dispatch,
  SetStateAction,
} from 'react'

export interface ContextProps<State> {
  state: State
  setState: Dispatch<SetStateAction<State>>
}

type UseContext<State> = () => Partial<ContextProps<State>>

// ToDo: add memoize
export function getContextProvider<State>(
  context: Context<Partial<ContextProps<State>>>,
  defaultValue: State
) {
  return (props: { children: ReactNode; value?: State }): JSX.Element => {
    const [state, setState] = useState<State>(props.value ?? defaultValue)
    const value = { state, setState }

    return <context.Provider value={value}>{props.children}</context.Provider>
  }
}

export function getUseContext<State>(
  context: Context<Partial<ContextProps<State>>>
): UseContext<State> {
  return () => {
    const value = useContext(context)
    if (value === undefined) {
      throw new Error('context value should not be undefined')
    }
    return value
  }
}
