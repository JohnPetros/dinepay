import { tv } from 'tailwind-variants'

import type { ButtonProps } from '../button-props'

const button = tv({
  base: 'rounded-md uppercase w-full font-semibold tracking-wider transition-colors hover:bg-light-grayish-cyan hover:text-very-dark-cyan disabled:opacity-70 disabled:cursor-not-allowed disabled:pinter-events-none',
  variants: {
    bg: {
      primary: 'bg-very-dark-cyan text-very-light-grayish-cyan',
      secondary: 'bg-very-light-grayish-cyan text-grayish-cyan',
      tertiary: 'bg-strong-cyan text-white',
    },
    size: {
      large: 'p-3 text-xl',
      small: 'p-2 text-sm',
    },
  },
  defaultVariants: {
    bg: 'primary',
    size: 'large',
  },
})

export const StyledButton = ({
  children,
  bg = 'primary',
  size = 'large',
  ...buttonProps
}: ButtonProps) => {
  return (
    <button type='button' className={button({ bg, size })} {...buttonProps}>
      {children}
    </button>
  )
}
