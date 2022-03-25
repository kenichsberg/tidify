import { FC } from 'react'
import Link from 'next/link'
import { PageName } from './'

export interface IconConfigs {
  url: string
  iconJsx: JSX.Element
}

type Props = {
  title: PageName
  configs: IconConfigs | undefined
  isCurrent: boolean
  index: number
  disabled?: boolean
}

export const MenuIcon: FC<Props> = ({
  title,
  configs,
  isCurrent,
  index,
  disabled = false,
}) => {
  const color = isCurrent
    ? ' bg-gradient-to-br from-bluegray-700 to-bluegray-900 text-bluegray-100'
    : ' transition hover:bg-bluegray-400 hover:text-bluegray-200'

  const marginY = index === 0 ? ' mb-2' : ' my-2'

  const cursor = disabled ? 'cursor-not-allowed' : 'cursor-pointer'

  if (configs === undefined) {
    return <Link href="#"></Link>
  }

  return (
    <Link href={configs.url}>
      <a>
        <div
          title={title}
          className={`flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center ${color} mx-auto ${marginY} ${cursor}`}
        >
          {configs.iconJsx}
        </div>
      </a>
    </Link>
  )
}
