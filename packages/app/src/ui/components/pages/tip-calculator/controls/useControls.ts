import { useState } from 'react'
import { useTipCalculatorContext } from '@/ui/contexts/tip-calculator-context'

export function useControls() {
  const { tipCalulator, setTipCalculator } = useTipCalculatorContext()
  const [billError, setBillError] = useState('')
  const [numberOfPeopleError, setNumberOfPeopleError] = useState('')

  function handleBillChange(bill: number) {
    try {
      setBillError('')
      setTipCalculator(tipCalulator.changeBill(bill))
    } catch (error) {
      setBillError(String(error))
    }
  }

  function handleNumberOfPeopleChange(numberOfPeople: number) {
    try {
      setNumberOfPeopleError('')
      setTipCalculator(tipCalulator.changeNumberOfPeople(numberOfPeople))
    } catch (error) {
      setNumberOfPeopleError(String(error))
    }
  }

  return {
    billError,
    numberOfPeopleError,
    handleBillChange,
    handleNumberOfPeopleChange,
  }
}
