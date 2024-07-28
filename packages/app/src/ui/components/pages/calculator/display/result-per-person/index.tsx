type ResultPerPersonProps = {
  label: string
  amount: number
}

export const ResultPerPerson = ({ label, amount }: ResultPerPersonProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

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
      <strong className='font-bold text-5xl text-strong-cyan'>
        {formatter.format(amount)}
      </strong>
    </div>
  )
}
