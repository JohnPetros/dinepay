import { useState } from 'react'

export function useReceiptCard() {
  const [isLoading, setIsLoading] = useState(false)

  function handleStartPayment() {
    setIsLoading(true)
  }

  function handleEndPayment() {
    setIsLoading(false)
  }

  return {
    isLoading,
    handleStartPayment,
    handleEndPayment,
  }
}
