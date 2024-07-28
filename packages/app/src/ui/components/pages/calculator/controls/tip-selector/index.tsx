import { TIP_PERCENTAGES } from '@dinepay/core/constants'
import { Button } from '@/ui/components/shared/button'

export const TipSelector = () => {
  return (
    <div className=''>
      <span className='label'>Select Tip %</span>
      <div className='grid grid-cols-3 gap-3 mt-3'>
        {TIP_PERCENTAGES.map((percentage) => (
          <Button key={percentage.toString()}>{`${percentage}%`}</Button>
        ))}
        <Button bg='secondary'>Custom</Button>
      </div>
    </div>
  )
}
