export type Mode = 'normal' | 'edit' | 'processing'

export type MutationType = 'create' | 'update' | 'delete' | undefined
export type SetMutationType = (arg0: MutationType) => void

export type Action = {
  type: MutationType
  setMutationType?: SetMutationType
} | null

export type NextPrev = 'next' | 'prev'
