import { FC } from 'react'
import Link from 'next/link'

type DataType = 'projects' | 'tasks'
type Props = {
  dataType: DataType
}
interface PageElements {
  dataType: DataType
  href: string
}

export const NoData: FC<Props> = ({ dataType }) => {
  const pageElements = getPageElements(dataType)

  return (
    <div className="font-mono">
      There is no {pageElements.dataType}. Please{' '}
      <Link href={pageElements.href}>
        <span className="underline text-lightblue-500 cursor-pointer">
          create {pageElements.dataType}
        </span>
      </Link>
      .
    </div>
  )
}

function getPageElements(dataType: DataType): PageElements {
  switch (dataType) {
    case 'projects':
      return { dataType: 'projects', href: '/' }
    case 'tasks':
      return { dataType: 'tasks', href: '/tasks' }
  }
}
