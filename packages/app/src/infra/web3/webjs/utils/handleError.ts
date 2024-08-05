import { ContractResponse } from '@dinepay/core/responses'

export function handleError<Data>(
  internalError: unknown,
  customErrorMessage?: string,
): ContractResponse<Data> {
  if (internalError instanceof Error) {
    console.error('Web3js error: ', internalError.message)
    if (internalError.message.toLocaleLowerCase().includes('user denied')) {
      const error = Error
      error.prototype.message = 'Action refused'

      return new ContractResponse({ error })
    }
  }

  const error = Error
  error.prototype.message = customErrorMessage ?? 'Unexpected error on use web3 :('

  return new ContractResponse({ error })
}
