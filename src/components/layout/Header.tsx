import { FC } from 'react'
//import Link from 'next/link'
import { Bell, Settings, User } from 'react-feather'

export const Header: FC = () => (
  <nav className="sticky flex items-center h-20 text-bluegray-800 mb-1 px-8 sm:px-16 xl:pl-48 xl:pr-28">
    <h1 className="flex-grow flex flex-col justify-content-center font-mono">
      <p className="text-3xl font-extrabold ml-2">Tidify</p>
      <p className="text-xs">The Project Manager</p>
    </h1>
    <div className="flex-shrink">
      <div className="rounded-full h-12 w-12 flex items-center justify-center hover:bg-bluegray-900 hover:text-bluegray-100 mx-auto cursor-pointer">
        <Bell size={20} />
      </div>
    </div>
    <div className="flex-shrink">
      <div className="rounded-full h-12 w-12 flex items-center justify-center hover:bg-bluegray-900 hover:text-bluegray-100 mx-auto cursor-pointer">
        <Settings size={20} />
      </div>
    </div>
    <div className="group flex-shrink border-l-2 border-bluegray-300 hidden md:flex items-center w-36 ml-2 pl-2">
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 text-bluegray-500 mx-auto cursor-pointer">
        <User size={20} />
      </div>
      <div className="text-bluegray-700 group-hover:text-bluegray-400">
        username
      </div>
    </div>
  </nav>
)
