import { useAmountFormatter } from '@/ui/hooks'

type ResultProps = {
  label: string
  amount: number
}

export const Result = ({ label, amount }: ResultProps) => {
  const formattedAmout = useAmountFormatter(amount)

  return (
    <div className='flex items-center justify-between w-full'>
      <span className='text-strong-cyan text-lg font-semibold'>{label}</span>
      <strong className='font-medium text-3xl text-very-light-grayish-cyan'>
        {formattedAmout}
      </strong>
    </div>
  )
}
