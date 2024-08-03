import type Web3 from 'web3'

import type { IDinapayContract } from '@dinepay/core/interfaces'
import type { Receipt } from '@dinepay/core/structs'
import { DinePayContractBuild } from '@dinepay/contract/build'
import { ContractResponse } from '@dinepay/core/responses'
import { handleError } from '../utils'
import { convertUsdToWei } from '../utils/convert-usd-to-wei'

const CONTRACT_ADDRESS = import.meta.env.VITE_DINAPAY_CONTRACT_ADDRESS

export const Web3jsDinePayContract = (web3js: Web3): IDinapayContract => {
  const contract = new web3js.eth.Contract(DinePayContractBuild.abi, CONTRACT_ADDRESS)

  return {
    async registerReceipt(receipt: Receipt) {
      try {
        const totalWeiAmount = await convertUsdToWei(receipt.totalAmount, web3js)

        const nonce = await web3js.eth.getTransactionCount(
          receipt.customerAccount,
          'latest',
        )

        const response = await contract.methods
          .registerReceipt(
            receipt.waiterAccount,
            receipt.tipPercentage.value,
            receipt.numberOfPeople.value,
          )
          .send({
            from: receipt.customerAccount,
            value: totalWeiAmount,
            nonce: nonce.toString(),
          })

        return new ContractResponse({ transactionHash: response.transactionHash })
      } catch (error) {
        console.log(error)
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
