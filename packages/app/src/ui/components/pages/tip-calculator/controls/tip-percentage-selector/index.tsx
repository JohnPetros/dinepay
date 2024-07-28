import { TIP_PERCENTAGES } from '@dinepay/core/constants'
import { Button } from '@/ui/components/shared/button'
import { useTipPercentageSelector } from './use-tip-percentage-selector'
import { ErrorMessage } from '@/ui/components/shared/error-message'
import { useTipCalculatorContext } from '@/ui/contexts/tip-calculator-context'
import { NumberInput } from '@/ui/components/shared/number-input'

export const TipPercentageSelector = () => {
  const { tipCalulator } = useTipCalculatorContext()
  const {
    error,
    isCustomPercentageInputVisible,
    handleButtonClick,
    handleCustomPercentageButtonClick,
    handleCustomPercentageInputChange,
  } = useTipPercentageSelector()

  return (
    <>
      <div className='flex items-center justify-between mb-2'>
        <span className='label'>Select Tip %</span>
        <ErrorMessage>{error}</ErrorMessage>
      </div>
      <div className='grid grid-cols-3 gap-3 mt-3'>
        {TIP_PERCENTAGES.map((percentage) => (
          <Button
            key={percentage.toString()}
            bg={tipCalulator.percentage.isEqualTo(percentage) ? 'tertiary' : 'primary'}
            onClick={() => handleButtonClick(percentage)}
          >{`${percentage}%`}</Button>
        ))}

        {isCustomPercentageInputVisible ? (
          <NumberInput autoFocus onChange={handleCustomPercentageInputChange} />
        ) : (
          <Button bg='secondary' onClick={handleCustomPercentageButtonClick}>
            Custom
          </Button>
        )}
      </div>
    </>
  )
}
