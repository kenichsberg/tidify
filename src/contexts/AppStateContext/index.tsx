import {
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useState,
  FC,
} from 'react'
/*
import { ReportsResponse } from 'graphql-client/queries/reports'

type AppState = {
  reports: Array<ReportsResponse>
  setReports: Dispatch<SetStateAction<Array<ReportsResponse>>>
}

type Props = {
  children: ReactNode
}

const InitialState = {
  reports: [],
  setReports: () => [],
}

export const AppStateContext = createContext<AppState>(InitialState)

export const AppStateProvider: FC<Props> = ({ children }) => {
  const [reports, setReports] = useState<Array<ReportsResponse>>([])

  return (
    <AppStateContext.Provider
      value={{
        reports,
        setReports,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
*/
