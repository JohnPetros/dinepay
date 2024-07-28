import { type ComponentProps, useId } from 'react'
import { Icon } from '@/ui/components/shared/icon'
import { StyledBorder } from './styled-border'
import { useNumberInput } from './use-number-input'
import { ErrorMessage } from '../error-message'

type NumberInputProps = {
  label?: string
  icon?: IconName
  error?: string
  onChange: (value: number) => void
} & Omit<ComponentProps<'input'>, 'onChange'>

export const NumberInput = ({
  label,
  icon,
  error,
  onChange,
  ...inputProps
}: NumberInputProps) => {
  const { handleChange } = useNumberInput(onChange)
  const id = useId()

  return (
    <div>
      <div className='flex items-center justify-between mb-2'>
        {label && (
          <label htmlFor={id} className='label'>
            {label}
          </label>
        )}
        <ErrorMessage>{error}</ErrorMessage>
      </div>
      <StyledBorder>
        <div className='flex items-center justify-between gap-3 px-2 py-2 bg-very-light-grayish-cyan'>
          {icon && (
            <Icon name={icon} size={20} className='text-grayish-cyan font-semibold' />
          )}
          <input
            id={id}
            type='number'
            min={0}
            onChange={handleChange}
            className='flex-1 font-semibold text-very-dark-cyan text-xl outline-none bg-transparent'
            {...inputProps}
          />
        </div>
      </StyledBorder>
    </div>
  )
}
