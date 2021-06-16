import { FC } from 'react'
import { ArrowDownCircle } from 'react-feather'
import { ToggleableFormDatetime, ToggleableFormNumber } from '.'

interface formNames {
  startDatetime: string
  endDatetime: string
  hour: string
}

type Props = {
  isEditing: boolean
  rowLabel: string
  names: formNames
  startDatetimeStr: string
  endDatetimeStr: string
  hour: number
  formRef?: any
}

export const Duration: FC<Props> = ({
  isEditing,
  rowLabel,
  names,
  startDatetimeStr,
  endDatetimeStr,
  hour,
  formRef,
}) => (
  <div className="max-w-3xl flex flex-col md:flex-row flex-grow justify-evenly items-center py-6 md:py-2">
    <p className="self-start md:self-center w-14 text-gray-400 text-left mr-1">
      {rowLabel}
    </p>
    <ToggleableFormDatetime
      isEditing={isEditing}
      name={names.startDatetime}
      initialValue={startDatetimeStr}
      formRef={formRef}
      label="From"
      className="text-xs"
      size="sm"
    />
    <ArrowDownCircle
      className="md:transform md:-rotate-90 stroke-current text-gray-400 mx-3 my-2"
      size={16}
    />
    <ToggleableFormNumber
      isEditing={isEditing}
      initialValue={hour}
      name={names.hour}
      formRef={formRef}
      label="Time"
      className="w-12 text-black border border-gray-300 rounded pl-1"
      size="sm"
    />
    <ArrowDownCircle
      className="md:transform md:-rotate-90 stroke-current text-gray-400 mx-3 my-1"
      size={16}
    />
    <ToggleableFormDatetime
      isEditing={isEditing}
      name={names.endDatetime}
      initialValue={endDatetimeStr}
      formRef={formRef}
      label="To"
      size="sm"
    />
  </div>
)
