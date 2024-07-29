import Web3 from 'web3'
import { Web3jsDinePayContract } from './contracts/web3js-dinepay-contract'

export function useWeb3js(provider: string) {
  const web3js = new Web3(provider)

  return {
    async getCustomerAccountAddress() {
      const accounts = await web3js.eth.requestAccounts()
      return accounts[0]
    },
    ...Web3jsDinePayContract(web3js),
  }
}
