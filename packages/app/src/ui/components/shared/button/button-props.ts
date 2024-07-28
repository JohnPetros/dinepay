import type { ComponentProps } from 'react'

export type ButtonProps = {
  children: string
  bg?: 'primary' | 'secondary' | 'tertiary'
} & ComponentProps<'button'>
