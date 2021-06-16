import { FC } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

type Props = {
  firstDay: Date
  setFirstDay: (arg0: Date) => void
}

export const YearMonthControler: FC<Props> = ({ firstDay, setFirstDay }) => {
  const yearMonthStr = firstDay.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
  })

  const moveMonthTo = (direction: -1 | 1) => {
    const newMonthFirstDay = new Date(firstDay)
    newMonthFirstDay.setMonth(firstDay.getMonth() + direction)
    console.log('firstDay: ' + newMonthFirstDay)
    setFirstDay(newMonthFirstDay)
  }

  return (
    <div className="flex mb-3">
      <button
        className="flex-shrink-0 rounded-full h-10 w-10 flex justify-center items-center hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        onClick={() => moveMonthTo(-1)}
      >
        <ChevronLeft />
      </button>
      <span className="flex-grow font-bold py-3">{yearMonthStr}</span>
      <button
        className="flex-shrink-0 rounded-full h-10 w-10 flex justify-center items-center hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        onClick={() => moveMonthTo(1)}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
