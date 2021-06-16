import { FC } from 'react'
import { AppProps } from 'next/app'
import '../styles/tailwind.css'
import Maintenance from './maintenance'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return <Maintenance />
  }
  return <Component {...pageProps} />
}

export default App
