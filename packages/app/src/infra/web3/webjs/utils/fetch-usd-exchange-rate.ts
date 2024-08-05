type ExchangeRate = {
  USD: number
}

export async function fetchUsdExchangeRate() {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  )

  const exchangeRate = (await response.json()) as ExchangeRate

  return exchangeRate.USD
}
