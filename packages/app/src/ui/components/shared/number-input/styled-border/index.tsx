import type { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const border = tv({
  base: 'ring- ring-transparent rounded-lg overflow-hidden',
  variants: {
    state: {
      default: 'focus-within:ring-strong-cyan',
      focus: 'ring-strong-cyan',
      error: 'ring-red-700',
    },
  },
  defaultVariants: {
    state: 'default',
  },
})

type StyledBorderProps = {
  children: ReactNode
  state?: 'default' | 'focus' | 'error'
}

export const StyledBorder = ({ children, state = 'default' }: StyledBorderProps) => {
  return <div className={border({ state })}>{children}</div>
}
