import { FC, useState, useRef, useEffect, MutableRefObject } from 'react'
import { Calendar, ClockHour, ClockMinute } from './'
import { Modal, InputField, TextInput } from 'components/common'
import { formatDatetimeDisplay } from 'utils/date'

export type Datetime = {
  year: number | undefined
  month: number | undefined
  day: number | undefined
  hour: number | undefined
  minute: number | undefined
}

type Props = {
  label?: string
  value: string | undefined
  setValue: (arg0: string) => void
}

export const DatetimePicker: FC<Props> = ({ label, value, setValue }) => {
  const [show, setShow] = useState<boolean>(false)
  const dateInit = value ? new Date(value) : undefined
  const [date, setDate] = useState<Date | undefined>(dateInit)

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
    setValue(selectedDate.toISOString() ?? '')
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

  return (
    <>
      <InputField label={label}>
        <TextInput
          name="startAt"
          className="w-28"
          value={formatDatetimeDisplay(value)}
          onFocus={() => setShow(true)}
          onInput={(event) => event?.preventDefault}
        />
      </InputField>
      <Modal show={show} setShow={setShow} onClose={onClose}>
        {getContentByPage(page)(date, datetimeRef, setNextPage(page))}
      </Modal>
    </>
  )
}

const getContentByPage = (page: number) => (
  date: Date | undefined,
  datetimeRef: MutableRefObject<Datetime>,
  setNextPage: () => void
) => {
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
    default:
      return <div>something wrong</div>
  }
}
