import { FC } from 'react'
import Link from 'next/link'
import { CornerUpRight } from 'react-feather'

export const AddTaskButton: FC = () => (
  <Link href="/tasks/">
    <a>
      <div className="flex justify-center items-center bg-cyan-500 text-bluegray-100 hover:bg-cyan-400 hover:text-bluegray-200 rounded-xl text-xs p-3 cursor-pointer">
        <CornerUpRight className="mr-3" size={16} />
        Add Tasks
      </div>
    </a>
  </Link>
)
