import { AppProps } from 'next/app'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProjectsProvider } from '@/contexts/project'
import { TasksProvider } from '@/contexts/task'
import { UsersProvider } from '@/contexts/user'
import { LoginUserProvider } from '@/contexts/user'

import '../styles/tailwind.css'
import Maintenance from './maintenance'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return (
      <>
        <Head>
          <title>Tidify Demo</title>
        </Head>
        <Maintenance />
      </>
    )
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <LoginUserProvider>
        <ProjectsProvider>
          <TasksProvider>
            <UsersProvider>
              <Component {...pageProps} />
            </UsersProvider>
          </TasksProvider>
        </ProjectsProvider>
      </LoginUserProvider>
    </DndProvider>
  )
}
