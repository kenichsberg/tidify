import { FC } from 'react'
import { Header, Sidebar, PageName } from 'components/layout'

type Props = {
  children: JSX.Element
  currentPageName: PageName
}

export const Layout: FC<Props> = ({ children, currentPageName }) => (
  <div className="w-full h-full min-h-screen bg-bluegray-200">
    <Header />
    <div className="flex flex-row pb-16">
      <div className="hidden xl:block">
        <Sidebar currentPageName={currentPageName} />
      </div>
      <main className="flex flex-col flex-grow overflow-auto px-4 sm:px-8 xl:pl-32 xl:pr-20">
        <div className="bg-gray-100 min-h-80vh rounded-3xl overflow-auto px-2 sm:px-6 md:px-8 lg:px-14 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  </div>
)
