import type Web3 from 'web3'
import { fetchUsdExchangeRate } from './fetch-usd-exchange-rate'

export async function convertUsdToWei(usdAmount: number, web3js: Web3) {
  const exchangeRate = await fetchUsdExchangeRate()

  const ethAmount = usdAmount / exchangeRate
  return web3js.utils.toWei(`${ethAmount}`, 'ether')
}
