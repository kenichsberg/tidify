import { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProjectsProvider } from '@/contexts/project'

import '../styles/tailwind.css'
import Maintenance from './maintenance'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return <Maintenance />
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <ProjectsProvider>
        <Component {...pageProps} />
      </ProjectsProvider>
    </DndProvider>
  )
}
