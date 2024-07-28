import { Button } from '@/ui/components/shared/button'
import { ResultPerPerson } from './result-per-person'

export const Display = () => {
  return (
    <div className='flex flex-col bg-very-dark-cyan rounded-lg p-6'>
      <div className='flex-1 flex flex-col gap-6'>
        <ResultPerPerson label='tip amount' amount={0} />
        <ResultPerPerson label='total' amount={0} />
      </div>
      <Button bg='tertiary'>Pay</Button>
    </div>
  )
}
