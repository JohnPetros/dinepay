import type Web3 from 'web3'

import type { IDinapayContract } from '@dinepay/core/interfaces'
import type { ReceiptDto } from '@dinepay/core/dtos'
import { DinePayContractBuild } from '@dinepay/contract/build'
import { ContractResponse } from '@dinepay/core/responses'
import { handleError } from '../utils'

const CONTRACT_ADDRESS = import.meta.env.VITE_DINAPAY_CONTRACT_ADDRESS

export const Web3jsDinePayContract = (web3js: Web3): IDinapayContract => {
  const contract = new web3js.eth.Contract(DinePayContractBuild.abi, CONTRACT_ADDRESS)

  return {
    async registerReceipt({
      bill,
      tipPercentage,
      numberOfPeople,
      waiterAccount,
      customerAccount,
    }: ReceiptDto) {
      try {
        const response = await contract.methods
          .registerReceipt(waiterAccount, bill, tipPercentage, numberOfPeople)
          .send({ from: customerAccount })

        return new ContractResponse({ transactionHash: response.transactionHash })
      } catch (error) {
        return handleError(error)
      }
    },

    // async getReceiptsByWaiter(waiterAccount: string) {
    //   const receipts = await contract.methods.getReceiptByWaiter(waiterAccount).call()

    //   receipts.

    //   return new ContractResponse(receipts)
    // },
  }
}
