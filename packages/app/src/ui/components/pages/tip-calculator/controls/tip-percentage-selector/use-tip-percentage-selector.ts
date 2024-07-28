import { useState } from 'react'

import { useTipCalculatorContext } from '@/ui/contexts/tip-calculator-context'

export function useTipPercentageSelector() {
  const { tipCalulator, setTipCalculator } = useTipCalculatorContext()
  const [error, setError] = useState('')
  const [isCustomPercentageInputVisible, setIsCustomPercentageInputVisible] =
    useState(false)

  function handleButtonClick(tipPercentage: number) {
    try {
      setError('')
      setTipCalculator(tipCalulator.changePercentage(tipPercentage))
      setIsCustomPercentageInputVisible(false)
    } catch (error) {
      setError(String(error))
    }
  }

  function handleCustomPercentageButtonClick() {
    setIsCustomPercentageInputVisible(
      (isCustomPercentageInputVisible) => !isCustomPercentageInputVisible,
    )
  }

  function handleCustomPercentageInputChange(tipPercentage: number) {
    try {
      setError('')
      setTipCalculator(tipCalulator.changePercentage(tipPercentage))
    } catch (error) {
      setError(String(error))
    }
  }

  return {
    error,
    isCustomPercentageInputVisible,
    handleButtonClick,
    handleCustomPercentageButtonClick,
    handleCustomPercentageInputChange,
  }
}
