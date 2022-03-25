import { useState, useRef, useEffect, MutableRefObject, Ref } from 'react'
import { Calendar, ClockHour, ClockMinute, DatetimePickerModal } from './'
import { PassiveInput } from 'components/common'
import { formatDatetimeDisplay } from 'utils/date'

export type Datetime = {
  year: number | undefined
  month: number | undefined
  day: number | undefined
  hour: number | undefined
  minute: number | undefined
}

type Props = {
  name: string
  className?: string
  inputRef?: Ref<HTMLInputElement>
  _value?: Date | undefined
  _onChange?: (arg0: any) => void
}

export function DatetimePicker({
  name,
  className = '',
  inputRef,
  _value,
  _onChange,
}: Props) {
  const [show, setShow] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>(_value)

  const [page, setPage] = useState<number>(0)

  const datetimeRef = useRef<Datetime>({
    year: undefined,
    month: undefined,
    day: undefined,
    hour: undefined,
    minute: undefined,
  })

  useEffect(() => {
    if (page < 3) return
    if (
      datetimeRef.current.year === undefined ||
      datetimeRef.current.month === undefined
    ) {
      return
    }
    const selectedDate = new Date(
      datetimeRef.current.year,
      datetimeRef.current.month,
      datetimeRef.current.day,
      datetimeRef.current.hour,
      datetimeRef.current.minute
    )
    setDate(selectedDate)
    _onChange && _onChange(selectedDate)
    setShow(false)
    onClose()
  }, [page])

  const onClose = () => {
    setPage(0)
    datetimeRef.current.year = undefined
    datetimeRef.current.month = undefined
    datetimeRef.current.day = undefined
    datetimeRef.current.hour = undefined
    datetimeRef.current.minute = undefined
  }
  const setNextPage = (page: number) => () => setPage(++page)
  console.log(date)

  return (
    <>
      <PassiveInput
        name={name}
        className={`w-full ${className}`}
        value={formatDatetimeDisplay(date?.toISOString())}
        onFocus={() => setShow(true)}
        inputRef={inputRef ? inputRef : undefined}
      />
      <DatetimePickerModal show={show} setShow={setShow} onClose={onClose}>
        {getContentByPage(page)(date, datetimeRef, setNextPage(page))}
      </DatetimePickerModal>
    </>
  )
}

function getContentByPage(page: number) {
  return function (
    date: Date | undefined,
    datetimeRef: MutableRefObject<Datetime>,
    setNextPage: () => void
  ): JSX.Element | null {
    switch (page) {
      case 0:
        return (
          <Calendar
            date={date}
            datetimeRef={datetimeRef}
            setNextPage={setNextPage}
          />
        )
      case 1:
        return (
          <ClockHour
            date={date}
            datetimeRef={datetimeRef}
            setNextPage={setNextPage}
          />
        )
      case 2:
        return (
          <ClockMinute
            date={date}
            datetimeRef={datetimeRef}
            setNextPage={setNextPage}
          />
        )
      case 3:
        return null
      default:
        throw new Error('invalid page number')
    }
  }
}
