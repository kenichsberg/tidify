import { ChevronLeft, ChevronRight } from 'react-feather'

type Props = {
  firstDay: Date
  setFirstDay: (arg0: Date) => void
}

export function YearMonthControler({
  firstDay,
  setFirstDay,
}: Props): JSX.Element {
  const yearMonthStr = firstDay.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
  })

  const moveMonthTo = (direction: 'next' | 'previous') => {
    const offset = direction === 'next' ? 1 : -1
    const newMonthFirstDay = new Date(firstDay)
    newMonthFirstDay.setMonth(firstDay.getMonth() + offset)
    console.log('firstDay: ' + newMonthFirstDay)
    setFirstDay(newMonthFirstDay)
  }

  return (
    <div className="flex mb-3">
      <button
        type="button"
        className="flex-shrink-0 rounded-full h-10 w-10 flex justify-center items-center hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        onClick={() => moveMonthTo('previous')}
      >
        <ChevronLeft />
      </button>
      <span className="flex-grow font-bold pl-3 py-3">{yearMonthStr}</span>
      <button
        type="button"
        className="flex-shrink-0 rounded-full h-10 w-10 flex justify-center items-center hover:bg-bluegray-400 hover:text-bluegray-200 active:bg-bluegray-900 active:text-bluegray-100 focus:outline-none"
        onClick={() => moveMonthTo('next')}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
