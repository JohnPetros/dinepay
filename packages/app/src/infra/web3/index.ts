import { useWalletContext } from '@/ui/contexts/wallet-context'
import { useWeb3js } from './webjs'

export function useWeb3() {
  const { wallet } = useWalletContext()

  return useWeb3js(wallet)
}
