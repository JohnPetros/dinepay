import { useMemo } from 'react'
import Web3 from 'web3'

import { Web3jsDinePayContract } from './contracts/web3js-dinepay-contract'
import { getUserAccount } from './utils'

export function useWeb3js(provider: string) {
  return useMemo(() => {
    const web3js = new Web3(provider)

    return {
      getUserAccount: async () => await getUserAccount(web3js),
      dinepayContract: Web3jsDinePayContract(web3js),
    }
  }, [provider])
}
