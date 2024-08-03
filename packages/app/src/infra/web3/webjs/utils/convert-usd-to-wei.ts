import type Web3 from 'web3'

type ExchangeRate = {
  USD: number
}

export async function convertUsdToWei(usdAmount: number, web3js: Web3) {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  )

  const exchangeRate = (await response.json()) as ExchangeRate

  const ethAmount = usdAmount / exchangeRate.USD
  return web3js.utils.toWei(`${ethAmount}`, 'ether')
}
