export const statusList = [
  { label: 'In Progress', value: 'WIP' },
  { label: 'Done', value: 'DONE' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Waiting', value: 'WAITING' },
  { label: 'Canceled', value: 'CANCELED' },
] as const

export type Status = typeof statusList[number]
