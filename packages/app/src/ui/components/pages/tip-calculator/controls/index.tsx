import { NumberInput } from '@/ui/components/shared/number-input'
import { TipPercentageSelector } from './tip-percentage-selector'
import { useControls } from './use-controls'

export const Controls = () => {
  const { billError, numberOfPeopleError, handleBillChange, handleNumberOfPeopleChange } =
    useControls()

  return (
    <div className='space-y-6'>
      <NumberInput
        label='Bill'
        icon='dollar-sign'
        error={billError}
        min={0}
        autoFocus
        onChange={handleBillChange}
      />
      <TipPercentageSelector />
      <NumberInput
        label='Number of People'
        icon='people'
        min={0}
        defaultValue={1}
        error={numberOfPeopleError}
        onChange={handleNumberOfPeopleChange}
      />
    </div>
  )
}
