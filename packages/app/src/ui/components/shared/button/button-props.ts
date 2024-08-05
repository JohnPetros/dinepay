import type { ComponentProps, ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  bg?: 'primary' | 'secondary' | 'tertiary'
  size?: 'large' | 'small'
} & ComponentProps<'button'>
