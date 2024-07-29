import type { ComponentProps } from 'react'

export type ButtonProps = {
  children: string
  bg?: 'primary' | 'secondary' | 'tertiary'
  size?: 'large' | 'small'
} & ComponentProps<'button'>
