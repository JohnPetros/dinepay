import { tv } from 'tailwind-variants'

import type { ButtonProps } from '../button-props'

const button = tv({
  base: 'rounded-md uppercase p-3 text-xl font-semibold transition-colors hover:bg-light-grayish-cyan hover:text-very-dark-cyan',
  variants: {
    bg: {
      primary: 'bg-very-dark-cyan text-very-light-grayish-cyan',
      secondary: 'bg-very-light-grayish-cyan text-grayish-cyan',
      tertiary: 'bg-strong-cyan text-very-dark-cyan',
    },
  },
  defaultVariants: {
    bg: 'primary',
  },
})

export const StyledButton = ({ children, bg = 'primary' }: ButtonProps) => {
  return (
    <button type='button' className={button({ bg })}>
      {children}
    </button>
  )
}
