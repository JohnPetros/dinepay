import { useContext } from 'react'
import { WalletContext } from '..'

export function useWalletContext() {
  const context = useContext(WalletContext)

  if (!context) {
    throw new Error('useMetamaskContext must be used inside MetamaskProvider')
  }

  return context
}
