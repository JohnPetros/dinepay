import type { ButtonProps } from './button-props'
import { StyledButton } from './styled-button'

export const Button = ({ children, ...buttonProps }: ButtonProps) => {
  return <StyledButton {...buttonProps}>{children}</StyledButton>
}
