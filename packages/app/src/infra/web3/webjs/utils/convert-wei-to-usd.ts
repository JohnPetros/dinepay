import type Web3 from 'web3'
import { fetchUsdExchangeRate } from './fetch-usd-exchange-rate'

export async function convertWeiToUsd(weiAmount: number, web3js: Web3) {
  const exchangeRate = await fetchUsdExchangeRate()

  return Number(web3js.utils.fromWei(weiAmount, 'ether')) * exchangeRate
}
