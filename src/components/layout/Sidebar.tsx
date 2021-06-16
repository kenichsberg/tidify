import { FC } from 'react'
import { Home, Users, Calendar, List } from 'react-feather'
import { MenuIcon, IconConfigs } from './'

type Props = {
  currentPageName: PageName
}

export const Sidebar: FC<Props> = ({ currentPageName }) => (
  <nav className="fixed top-0 flex flex-col w-32 h-screen pt-24 pb-20 text-bluegray-600 overflow-y-auto">
    {pageNames.map((pageName, index) => {
      const configs = pageNameToData.get(pageName)
      const isCurrent = pageName === currentPageName

      return (
        <MenuIcon
          title={pageName}
          configs={configs}
          isCurrent={isCurrent}
          index={index}
          key={pageName}
        />
      )
    })}
  </nav>
)

const pageNameToDataInit = [
  ['Home', { url: '/', iconJsx: <Home size={28} /> }],
  ['Schedule', { url: '/schedule', iconJsx: <Calendar size={28} /> }],
  ['Tasks', { url: '/tasks', iconJsx: <List size={28} /> }],
  ['Users', { url: '/users', iconJsx: <Users size={28} /> }],
] as const
export type PageName = typeof pageNameToDataInit[number][0]

const pageNameToData: ReadonlyMap<PageName, IconConfigs> = new Map<
  PageName,
  IconConfigs
>(pageNameToDataInit)

const pageNames = [...pageNameToData.keys()]
