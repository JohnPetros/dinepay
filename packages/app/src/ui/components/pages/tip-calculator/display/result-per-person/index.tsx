import { useAmountFormatter } from '@/ui/hooks'

type ResultPerPersonProps = {
  label: string
  amount: number
}

export const ResultPerPerson = ({ label, amount }: ResultPerPersonProps) => {
  const formattedAmout = useAmountFormatter(amount)

  return (
    <div className='flex items-center justify-between w-full'>
      <div>
        <span className='block font-semibold text-lg text-very-light-grayish-cyan'>
          {label}
        </span>
        <span className='text-grayish-cyan mt-2'>
          <span aria-label='per'>/</span>
          <span className='ml-1'>person</span>
        </span>
      </div>
      <strong className='font-bold text-5xl text-strong-cyan'>{formattedAmout}</strong>
    </div>
  )
}
