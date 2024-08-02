type ExchangeRate = {
  USD: number
}

export async function convertUsdToWei(usdAmount: number) {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  )

  const exchangeRate = (await response.json()) as ExchangeRate

  const weiPerEth = 10 ** 18 // 1 ETH = 10^18 wei
  const amountInEth = usdAmount / exchangeRate.USD
  const amountInWei = amountInEth * weiPerEth
  return amountInWei
}
