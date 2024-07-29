import { ContractResponse } from '@dinepay/core/responses'

export function handleError<Data>(errorMessage: unknown): ContractResponse<Data> {
  console.error('Web3js error: ', errorMessage)

  const error = Error
  error.prototype.message = 'Unexpected error on use web3 :('

  return new ContractResponse({ error })
}
