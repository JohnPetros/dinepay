import type { ComponentProps } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  route: string
  className?: string
} & ComponentProps<'a'>

export function Link({ route, className, ...linkProps }: LinkProps) {
  return (
    <RouterLink
      to={route}
      className={`text-grayish-cyan font-semibold ${className}`}
      {...linkProps}
    />
  )
}
