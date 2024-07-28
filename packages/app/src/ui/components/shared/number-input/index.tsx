import { useId } from 'react'
import { Icon } from '@/ui/components/shared/icon'
import { StyledBorder } from './styled-border'

type NumberInputProps = {
  icon: IconName
  label: string
  error?: string
}

export const NumberInput = ({ label, icon, error }: NumberInputProps) => {
  const id = useId()

  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
        <label htmlFor={id} className='label'>
          {label}
        </label>
        {error && <strong>{error}</strong>}
      </div>
      <StyledBorder>
        <div className='flex items-center justify-between gap-3 px-2 py-2 bg-very-light-grayish-cyan'>
          <Icon name={icon} size={20} className='text-grayish-cyan font-semibold' />
          <input
            id={id}
            type='number'
            className='flex-1 font-semibold text-very-dark-cyan text-xl outline-none bg-transparent '
          />
        </div>
      </StyledBorder>
    </div>
  )
}
