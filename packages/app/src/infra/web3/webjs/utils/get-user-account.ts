import type Web3 from 'web3'

export async function getUserAccount(web3js: Web3) {
  const accounts = await web3js.eth.requestAccounts()
  return accounts[0]
}
