import { FC } from 'react'
import { Header, Sidebar, PageName } from 'components/layout'

type Props = {
  children: JSX.Element
  currentPageName: PageName
}

export const Layout: FC<Props> = ({ children, currentPageName }) => (
  <div className="w-full h-full min-h-screen bg-gradient-to-br from-bluegray-100/90 to-bluegray-200">
    <Header />
    <div className="flex flex-row pb-16">
      <div className="hidden xl:block">
        <Sidebar currentPageName={currentPageName} />
      </div>
      <main className="flex flex-col flex-grow overflow-x px-4 sm:px-8 xl:pl-28">
        {children}
      </main>
    </div>
  </div>
)
