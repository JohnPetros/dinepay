import type Web3 from 'web3'

import type { ReceiptDto } from '@dinepay/core/dtos'
import { convertWeiToUsd } from '../utils'

export const Web3jsReceiptDtoMapper = (web3js: Web3) => {
  return {
    async toDto(webjsReceiptDto: ReceiptDto) {
      const totalUsdAmount = await convertWeiToUsd(webjsReceiptDto.totalAmount, web3js)

      return {
        id: webjsReceiptDto.id,
        waiterAccount: webjsReceiptDto.waiterAccount,
        customerAccount: webjsReceiptDto.customerAccount,
        isWithdrawn: webjsReceiptDto.isWithdrawn,
        totalAmount: totalUsdAmount,
        tipPercentage: Number(webjsReceiptDto.tipPercentage),
        createdAt: new Date(Number(webjsReceiptDto.createdAt) * 1000),
      }
    },
  }
}
