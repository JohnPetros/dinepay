import { ResultPerPerson } from './result-per-person'
import { useTipCalculatorContext } from '@/ui/contexts/tip-calculator-context'
import { Result } from './result'
import { PayamentButton } from './payament-button'

export const Display = () => {
  const { tipCalulator } = useTipCalculatorContext()

  return (
    <div className='flex flex-col bg-very-dark-cyan rounded-lg p-6'>
      <div className='flex-1 flex flex-col gap-6'>
        <ResultPerPerson label='tip amount' amount={tipCalulator.tipAmountPerPerson} />
        <ResultPerPerson label='total' amount={tipCalulator.totalAmountPerPerson} />
        <div className='space-y-2'>
          <Result label='total' amount={tipCalulator.totalAmount} />
          <Result label='tip amount' amount={tipCalulator.tipAmount} />
        </div>
      </div>
      <div className='mt-3'>
        <PayamentButton />
      </div>
    </div>
  )
}
