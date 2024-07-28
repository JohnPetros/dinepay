type ErrorMessageProps = {
  children: string | undefined
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return children ? <strong className='font-bold text-red-500'>{children}</strong> : null
}
