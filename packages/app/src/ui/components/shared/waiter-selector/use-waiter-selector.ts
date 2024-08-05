import { useCallback, useState } from 'react'

import { WAITERS } from '@/ui/constants'

export function useWaiterSelector(
  canSelectAll: boolean,
  onSelect: (waiterAccountAddress: string) => void,
) {
  const [selectedWaiter, setSelectedWaiter] = useState(canSelectAll ? 'all' : WAITERS[0])

  const reset = useCallback(() => {
    setSelectedWaiter(canSelectAll ? 'all' : WAITERS[0])
  }, [canSelectAll])

  function handleSelectorChange(value: string) {
    if (value === 'all') {
      setSelectedWaiter('all')
      onSelect('all')
      return
    }

    const waiter = WAITERS.find((waiter) => waiter.id === Number(value))

    if (waiter) {
      setSelectedWaiter(waiter)
      onSelect(waiter.accountAddress)
    }
  }

  return {
    selectedWaiter,
    handleSelectorChange,
    reset,
  }
}
