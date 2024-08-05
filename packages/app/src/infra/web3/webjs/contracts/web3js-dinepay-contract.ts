import type Web3 from 'web3'

import type { IDinepayContract } from '@dinepay/core/interfaces'
import type { Receipt } from '@dinepay/core/entities'
import type { ReceiptDto } from '@dinepay/core/dtos'
import { DinePayContractBuild } from '@dinepay/contract/build'
import { ContractResponse } from '@dinepay/core/responses'

import { handleError, convertUsdToWei, convertWeiToUsd } from '../utils'
import { Web3jsReceiptDtoMapper } from '../mappers'

const CONTRACT_ADDRESS = import.meta.env.VITE_DINAPAY_CONTRACT_ADDRESS
const OWNER_ACCOUNT_ADDRESS = import.meta.env.VITE_OWNER_ACCOUNT_ADDRESS

export const Web3jsDinePayContract = (web3js: Web3): IDinepayContract => {
  const contract = new web3js.eth.Contract(DinePayContractBuild.abi, CONTRACT_ADDRESS)
  const web3jsReceiptDtoMapper = Web3jsReceiptDtoMapper(web3js)

  return {
    async getBalance() {
      try {
        const data = await contract.methods
          .getBalance()
          .call({ from: OWNER_ACCOUNT_ADDRESS })

        const balance = await convertWeiToUsd(Number(data), web3js)
        return new ContractResponse({ data: balance })
      } catch (error) {
        return handleError(error)
      }
    },

    async getReceipts() {
      try {
        const data = (await contract.methods
          .getReceipts()
          .call({ from: OWNER_ACCOUNT_ADDRESS })) as ReceiptDto[]

        const receipts: ReceiptDto[] = []

        for (const receipt of data) {
          receipts.push(await web3jsReceiptDtoMapper.toDto(receipt))
        }

        receipts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return new ContractResponse({ data: receipts })
      } catch (error) {
        return handleError(error)
      }
    },

    async getReceiptsByWaiter(waiterAccount) {
      try {
        const data = (await contract.methods
          .getReceiptsByWaiter(waiterAccount)
          .call({ from: OWNER_ACCOUNT_ADDRESS })) as ReceiptDto[]

        const receipts: ReceiptDto[] = []

        for (const receipt of data) {
          receipts.push(await web3jsReceiptDtoMapper.toDto(receipt))
        }

        receipts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return new ContractResponse({ data: receipts })
      } catch (error) {
        return handleError(error, 'No receipt found for this waiter')
      }
    },

    async registerReceipt(receipt: Receipt) {
      try {
        const totalWeiAmount = await convertUsdToWei(receipt.totalAmount.value, web3js)

        const nonce = await web3js.eth.getTransactionCount(
          receipt.customerAccount,
          'latest',
        )

        const response = await contract.methods
          .registerReceipt(receipt.waiterAccount, receipt.tipPercentage.value)
          .send({
            from: receipt.customerAccount,
            value: totalWeiAmount,
            nonce: nonce.toString(),
          })

        return new ContractResponse({ transactionHash: response.transactionHash })
      } catch (error) {
        return handleError(error)
      }
    },

    async getWaiterDividend(waiterAccount) {
      try {
        const data = await contract.methods.getWaiterDividend(waiterAccount).call()

        const dividend = web3js.utils.fromWei(Number(data), 'ether')

        return new ContractResponse({ data: Number(dividend) })
      } catch (error) {
        return handleError(
          error,
          'it was not possible to get the dividend for this waiter',
        )
      }
    },

    async payWaiterReceipt(receiptId: number) {
      try {
        const nonce = await web3js.eth.getTransactionCount(
          OWNER_ACCOUNT_ADDRESS,
          'latest',
        )

        await contract.methods.payWaiterReceipt(receiptId).send({
          from: OWNER_ACCOUNT_ADDRESS,
          nonce: nonce.toString(),
        })

        return new ContractResponse()
      } catch (error) {
        return handleError(error)
      }
    },

    async payWaiter(waiterAccount: string) {
      try {
        await contract.methods
          .payWaiter(waiterAccount)
          .send({ from: OWNER_ACCOUNT_ADDRESS })

        return new ContractResponse()
      } catch (error) {
        return handleError(error)
      }
    },

    async payAllWaiters() {
      try {
        const nonce = await web3js.eth.getTransactionCount(
          OWNER_ACCOUNT_ADDRESS,
          'latest',
        )

        await contract.methods
          .payAllWaiters()
          .send({ from: OWNER_ACCOUNT_ADDRESS, nonce: nonce.toString() })

        return new ContractResponse()
      } catch (error) {
        return handleError(error)
      }
    },

    async withdraw() {
      try {
        const nonce = await web3js.eth.getTransactionCount(
          OWNER_ACCOUNT_ADDRESS,
          'latest',
        )

        await contract.methods
          .withdraw()
          .send({ from: OWNER_ACCOUNT_ADDRESS, nonce: nonce.toString() })

        return new ContractResponse()
      } catch (error) {
        return handleError(error)
      }
    },
  }
}
