import { useState } from 'react'

import { WAITERS } from '@/ui/constants'

export function useWaiterSelector(onSelect: (waiterAccountAddress: string) => void) {
  const [selectedWaiter, setSelectedWaiter] = useState(WAITERS[0])

  function handleSelectorChange(waiterId: number) {
    const waiter = WAITERS.find((waiter) => waiter.id === waiterId)

    if (waiter) {
      setSelectedWaiter(waiter)
      onSelect(waiter.accountAddress)
    }
  }

  return {
    selectedWaiter,
    handleSelectorChange,
  }
}
