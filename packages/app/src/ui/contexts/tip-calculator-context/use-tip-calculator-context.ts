import { useContext } from 'react'
import { TipCalulatorContext } from '.'

export function useTipCalculatorContext() {
  const context = useContext(TipCalulatorContext)

  if (!context) {
    throw new Error('useCalculatorContext must be used inside TipCalulatorProvider')
  }

  return context
}
