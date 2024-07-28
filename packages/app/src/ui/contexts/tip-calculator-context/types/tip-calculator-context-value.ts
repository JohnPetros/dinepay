import type { TipCalculator } from '@dinepay/core/structs'

export type TipCalculatorContextValue = {
  tipCalulator: TipCalculator
  setTipCalculator: (tipCalulator: TipCalculator) => void
}
