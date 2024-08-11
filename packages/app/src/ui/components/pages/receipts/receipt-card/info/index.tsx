type InfoProps = {
  label: string
  value: string
}

export function Info({ label, value }: InfoProps) {
  return (
    <div className='flex items-center gap-1'>
      <dt className='text-xs md:text-sm text-grayish-cyan font-medium'>{label}:</dt>
      <dl className='text-xs md:text-sm text-grayish-cyan font-medium truncate'>
        {value}
      </dl>
    </div>
  )
}
