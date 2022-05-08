import { AppProps } from 'next/app'
import Head from 'next/head'
import { User } from '@prisma/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
      <LoginUserProvider value={loginUser}>
        <Component {...pageProps} />
      </LoginUserProvider>
    </DndProvider>
  )
}

const loginUser = {
  uuid: 'fa87edeb-aeca-4b7d-b631-35e95a815fde',
  name: 'Joey',
  email: 'joey@mail.com',
  role: 'MEMBER' as User['role'],
  durationPerDay: 8,
  dayOff: ['SAT', 'SUN'] as User['dayOff'],
}
