import { NumberInput } from '@/ui/components/shared/number-input'
import { TipPercentageSelector } from './tip-percentage-selector'
import { useControls } from './useControls'

export const Controls = () => {
  const { billError, numberOfPeopleError, handleBillChange, handleNumberOfPeopleChange } =
    useControls()

  return (
    <div className='space-y-6'>
      <NumberInput
        label='Bill'
        icon='dollar-sign'
        error={billError}
        onChange={handleBillChange}
      />
      <TipPercentageSelector />
      <NumberInput
        label='Number of People'
        icon='people'
        error={numberOfPeopleError}
        onChange={handleNumberOfPeopleChange}
      />
    </div>
  )
}
