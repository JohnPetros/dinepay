import { NumberInput } from '@/ui/components/shared/number-input'
import { TipSelector } from './tip-selector'

export const Controls = () => {
  return (
    <div className='space-y-6'>
      <NumberInput label='Bill' icon='dollar-sign' />
      <TipSelector />
      <NumberInput label='Number of People' icon='people' />
    </div>
  )
}
