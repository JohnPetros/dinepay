import { createContext, useState, type ReactNode } from 'react'

import { TipCalculator } from '@dinepay/core/structs'

import type { TipCalculatorContextValue } from './types/tip-calculator-context-value'

export { useTipCalculatorContext } from './use-tip-calculator-context'

export const TipCalulatorContext = createContext<TipCalculatorContextValue>(
  {} as TipCalculatorContextValue,
)

type TipCalulatorProviderProps = {
  children: ReactNode
}

export const TipCalulatorProvider = ({ children }: TipCalulatorProviderProps) => {
  const [tipCalulator, setTipCalculator] = useState(TipCalculator.create())

  return (
    <TipCalulatorContext.Provider value={{ tipCalulator, setTipCalculator }}>
      {children}
    </TipCalulatorContext.Provider>
  )
}
