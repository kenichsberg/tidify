import { useEffect, useRef } from 'react'
import { MutationType } from 'components/types'

export function useCRUD(
  shouldCancel: boolean,
  mutationType: MutationType,
  createCallback: (...arg0: any) => Promise<void>,
  updateCallback: (...arg0: any) => Promise<void>,
  deleteCallback: (...arg0: any) => Promise<void>,
  deps: any[] = []
): void {
  const isFirstCall = useRef<boolean>(true)

  useEffect(() => {
    isFirstCall.current = true
  }, [shouldCancel])

  useEffect(() => {
    if (shouldCancel) return
    if (!isFirstCall.current) return
    isFirstCall.current = false

    switch (mutationType) {
      case 'create':
        createCallback(...deps)
        break
      case 'update':
        updateCallback(...deps)
        break
      case 'delete':
        deleteCallback(...deps)
        break
    }
  }, [shouldCancel, ...deps])
}
